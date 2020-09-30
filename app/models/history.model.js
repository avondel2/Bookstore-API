const mongoose = require("mongoose");

const History = mongoose.model(
  "History",
  new mongoose.Schema({
    bookID:{type:mongoose.Schema.Types.ObjectId},
    userID:{type:mongoose.Schema.Types.ObjectId},
    returned:{type:Boolean,default:false},
    RentDate:{type:Date,default:Date.now},
    ReturnDate:{type:Date,min:Date.now,default:null}
  })
);

module.exports = History;