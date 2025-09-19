import dotenv from 'dotenv';

if(process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import express from "express";
import {createServer} from "node:http";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/usersRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb" })); //helps to prevent payload crash..
app.use(express.urlencoded({limit : "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

const start = async () => {

    app.set("mongo_user")
    const connectionDb = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MONGO Connected DB host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"), ()=> {
        console.log("LISTENING ON PORT 8000");
    });
};

start();