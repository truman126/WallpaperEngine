import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import db from "./db/index.js";
import imageRouter from "./routes/image-router.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import userActionRouter from "./routes/userAction.js";
import contentRouter from './routes/content-router.js';


import dotenv from 'dotenv';  // Import dotenv
import path from 'path';
dotenv.config();

var app = express()

//temp solution for using development or production CORS
app.use(cors());

const apiPort = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const __dirname = path.resolve();
app.use(express.static(__dirname + "/data/"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/user", userRouter);
app.use("/api/useraction", userActionRouter);
app.use("/api/content", contentRouter);



app.use("/api/admin", adminRouter)

app.use("/api", imageRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
