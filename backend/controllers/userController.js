import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail.js";
import { compare, genSalt, hash } from "bcrypt";
import { User } from "../models/userModel.js";
import { secretString } from "../config.js";

const createToken = (id) => {
    return jwt.sign({ id }, secretString, { expiresIn: '3d' });
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: "Send all required fields: email, password" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "Incorrect email" });
        }
        const match = await compare(password, user.password);
        if (!match) {
            return res.status(400).send({ message: "Incorrect Password" });
        }
        const token = createToken(user._id);
        res.status(200).json({ "message": "User Signup Successfully", email, token });
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

export const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: "Send all required fields: email, password" });
        }
        if (!isEmail(email)) {
            return res.status(400).send({ message: "Email is not valid" });
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).send({ message: "Email already exists" });
        }
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        const user = await User.create({ email, password: hashedPassword });
        const token = createToken(user._id);
        res.status(200).json({ "message": "User Signup Successfully", email, token });
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
}