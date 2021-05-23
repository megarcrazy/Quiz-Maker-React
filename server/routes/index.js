var express = require("express");
var cors = require("cors")
var router = express.Router();
router.use(cors())

const fs = require("fs");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* Get data from data base */
router.get("/data", function(req, res) {
  const dataBase = JSON.parse(fs.readFileSync("./dataBase/quizData.json"));
  res.send(dataBase);
});

router.get("/data/:quizNumber", function(req, res) {
  const quizNumber = req.params.quizNumber;
  const dataBase = JSON.parse(fs.readFileSync("./dataBase/quizData.json"));
  if (quizNumber >= 1 && quizNumber <= dataBase.length) {
    const data = dataBase[quizNumber - 1];
    res.send(data);
  } else {
    res.send("Not found");
  }
});

/* Edit Quiz */
router.post("/edit/:quizNumber", function (req, res) {
  const quizNumber = req.params.quizNumber;
  const path = "./dataBase/quizData.json";
  let dataBase = JSON.parse(fs.readFileSync(path));
  dataBase[quizNumber - 1] = req.body.quizData;

  fs.writeFileSync(path, JSON.stringify(dataBase, null, "\t"));
  res.send();
})

/* Delete Quiz */
router.post("/delete/:quizNumber", function (req, res) {
  const quizNumber = req.params.quizNumber;
  const path = "./dataBase/quizData.json";
  const dataBase = JSON.parse(fs.readFileSync(path));
  dataBase.splice(quizNumber - 1, 1);
  fs.writeFileSync(path, JSON.stringify(dataBase, null, "\t"));
  res.send();
});

module.exports = router;
