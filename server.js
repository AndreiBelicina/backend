const express = require("express");
const app = express();
require ("dotenv").config();
const connectDb = require("./config/connectionDb")
const cors = require("cors")
const path = require('path');

connectDb()


app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use("/", require("./routes/user"))
app.use("/recipe", require("./routes/recipe"))
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.listen(process.env.PORT || 8080 , () => {
  console.log('listening on port!!!');
});


