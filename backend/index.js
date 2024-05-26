import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRoutes from "./routes/booksRoute.js";
import userRoutes from "./routes/userRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

app.get("/",(req,res)=>{
    console.log("Home Page");
    return res.status(234).send("Welcome to first MERN Project");
});

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
});

app.use('/books',bookRoutes);
app.use('/user',userRoutes);

mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log('Connected to Database');
        app.listen(PORT,()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>console.log(error));