const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {type:String,unique:true,lowercase:true},
    password: {type:String},
    fullname: {type:String},
    roles:{type:String,default:"Customer"}
  })
);

module.exports = User;