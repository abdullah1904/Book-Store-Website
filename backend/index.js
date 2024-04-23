import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRoute from "./routes/booksRoute.js";
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

app.use('/books',bookRoute);

mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log('Connected to Database');
        app.listen(PORT,()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>console.log(error));