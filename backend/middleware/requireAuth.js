import jwt from "jsonwebtoken";
import { secretString } from "../config.js";
import {User} from "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error: "Authorization token required"});
    }
    const token = authorization.split(' ')[1];
    try{
        const {_id} = jwt.verify(token,secretString);
        req.user = await User.findOne({_id}).select('_id');
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({error: 'Request isn\'t authorized'});
    }
}