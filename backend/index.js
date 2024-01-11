const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const sendemailRouter = require("./routes/sendemail.js");
const verifyemailRouter = require("./routes/verifyemail");

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.session_secret, // You should set a secret to secure your session
    resave: false,
    saveUninitialized: true,
  })
);
// console.log(process.env.secret);
//setting view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));

//routes
app.use("/sendemail", sendemailRouter);
app.use("/verifyemail", verifyemailRouter);

app.get("/", async (req, res) => {
  console.log("from backend");
  res.send("Server is listening on port 3000 ");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
