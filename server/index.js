const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const imageRouter = require("./routes/image-router");
const userRouter = require("./routes/user");
require('dotenv').config()
const app = express();
app.use(cors());

const apiPort = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static(__dirname + "/data"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/user", userRouter);
app.use("/api", imageRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
