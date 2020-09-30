const mongoose = require("mongoose");

const Books = mongoose.model(
  "Books",
  new mongoose.Schema({
    bookname: String,
    barcode:{type:Number,unique:true},
    quantity: {type:Number,min:0,default:0}
  })
);

module.exports = Books;