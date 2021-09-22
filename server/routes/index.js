var express = require("express");
var cors = require("cors")
var router = express.Router();
router.use(cors())

const fs = require("fs");
const databasePath = "./database/quizData.json";
const backupDatabasePath = "./database/quizDataBackUp.json";

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* Get data from data base */
router.get("/data", function(req, res) {
  const database = JSON.parse(fs.readFileSync(databasePath));
  res.send(database);
  console.log("hey");
});

/* Get quiz data base */
router.get("/data/:quizNumber", function(req, res) {
  const quizNumber = req.params.quizNumber;
  const file = fs.readFileSync("./database/quizData.json");
  const database = JSON.parse(file);
  if (quizNumber == "length") {
    res.send(JSON.stringify(database.length));
  } else if (quizNumber >= 1 && quizNumber <= database.length) {
    const data = database[quizNumber - 1];
    res.send(data);
  } else {
    res.send("Not found");
  }
});

/* Edit Quiz */
router.post("/edit/:quizNumber", function (req, res) {
  const quizNumber = req.params.quizNumber;
  let database = JSON.parse(fs.readFileSync(databasePath));
  if (quizNumber == database.length + 1) {
    database.push(req.body.quizData);
  } else {
    database[quizNumber - 1] = req.body.quizData;
  }

  fs.writeFileSync(databasePath, JSON.stringify(database, null, "\t"));
  res.send();
})

/* Delete Quiz */
router.post("/delete/:quizNumber", function (req, res) {
  const quizNumber = req.params.quizNumber;
  const database = JSON.parse(fs.readFileSync(databasePath));
  database.splice(quizNumber - 1, 1);
  fs.writeFileSync(databasePath, JSON.stringify(database, null, "\t"));
  res.send();
});

/* Restart Database */
router.post("/restart", function (req, res) {
  const database = JSON.parse(fs.readFileSync(backupDatabasePath));
  fs.writeFileSync(databasePath, JSON.stringify(database, null, "\t"));
  res.send();
});

module.exports = router;
