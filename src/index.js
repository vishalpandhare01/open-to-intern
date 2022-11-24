//=====================Importing Module and Packages=====================//
const express = require("express");
const route = require("./routes/route.js");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://vishal0102:vishal0102@cluster0.9uryho2.mongodb.net/intern",{
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is Connected."))
  .catch((error) => console.log(error));

app.use("/", route);

//===================== It will Handle error When You input Wrong Route =====================//
app.use(function (req, res) {
  var err = new Error("Not Found.");
  err.status = 404;
  return res.status(404).send({ status: "404", msg: "Path not Found." });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express App Running on Port: " + (process.env.PORT || 3000));
});
