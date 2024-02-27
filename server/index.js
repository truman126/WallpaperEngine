var express = require('express')
var cors = require('cors')
var app = express()
const bodyParser = require("body-parser");
const db = require("./db");
const imageRouter = require("./routes/image-router");
const userRouter = require("./routes/user");
require('dotenv').config()


//temp solution for using development or production CORS
if (process.env.USE_CORS == 1){
  console.log("CORS: ",process.env.USE_CORS == 1)
  app.use(cors({
    origin: 'https://truman.xyz',
    credentials:"true"  
  }));
}
else (
  app.use(cors())
)

const apiPort = process.env.PORT;

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
