import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import cors from "cors";

import { checkAuth } from "./middlewares";
import { createRoutes, createSocket } from "./core";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
const http = createServer(app);
const io = createSocket(http);

dotenv.config();

app.use(bodyParser.json());
app.use(checkAuth);
app.use(cors(corsOptions))

mongoose.connect("mongodb://localhost:27017/chat");

createRoutes(app, io);

http.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT} is started`);
});
