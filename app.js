const express = require("express");
const app = express();
var mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongodb connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we are connected");
});

//schema
var UserSchema = new mongoose.Schema({
    name: String,
    pnumber: String,
    email: String,
    state: String,
    age: String,
    gender: String,
    qualification: String,
    occupation:String,
    goals: String,
    motivation: String,
    date: { type: Date, default: Date.now },
});
var User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
  express.static(path.join(__dirname, "public"));
});

//routes
app.post("/addaction", (req, res) => {
  console.log("req.body", req.body);
  var myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      res.send("User details saved to database");
     
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});

app.get("/getusers", (req, res) => {
  var myData = new User();
  User.find().then((data) => {
    console.log("Data", data);
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
