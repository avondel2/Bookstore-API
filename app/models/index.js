const mongoose = require('mongoose');
const dbConfig = require("../config/db.config.js")
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

db.user = require("./user.model");
db.books = require("./books.model");
db.history = require("./history.model")

module.exports = db;