const express = require('express')
const bodyParser = require("body-parser");
const app = express()

const db = require("./app/models");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({message:'Hello World TEST'})
})


require("./app/routes/auth.routes")(app);
require('./app/routes/books.routes')(app);
require("./app/routes/history.routes")(app);

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})