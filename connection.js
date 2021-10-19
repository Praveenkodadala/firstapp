const dotenv = require('dotenv').config();
// require('dotenv').config();
const mongoose = require('mongoose');



// const result = dotenv.config()
 
// if (result.error) {
//   throw result.error
// }
 
// console.log(result.parsed)



mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://praveen:nopassword@cluster0.o1rjc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true , useUnifiedTopology: true} )



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected')
});

module.exports = db;