const express = require('express')
const app = express()
var mongoose = require("mongoose");
const connectDb = require('./connection');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'))
const path = require('path')


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var nameSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    country:String,
    subject : String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    express.static(path.join(__dirname, 'public'))
});



app.post("/addaction", (req, res) => {
    console.log("req.body", req.body)
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.get("/getusers", (req, res) => {
    var myData = new User();
     User.find().then((data) => {
         console.log("Data", data)
         res.send(data)
     })
 })

 app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
})