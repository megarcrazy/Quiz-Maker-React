var express = require("express");
var cors = require("cors")
var router = express.Router();
router.use(cors());

const fs = require("fs");
const databasePath = "./database/quizData.json";
const backupDatabasePath = "./database/quizDataBackUp.json";


/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});


/* Get data from database */
router.get("/data", function (req, res) {
    const database = JSON.parse(fs.readFileSync(databasePath));
    res.send(database);
});


/* Get quiz database */
router.get("/data/:quizNumber", function (req, res) {
    const quizNumber = req.params.quizNumber;
    const file = fs.readFileSync("./database/quizData.json");
    const database = JSON.parse(file);
    if (quizNumber >= 1 && quizNumber <= database.length) {
        const data = database[quizNumber - 1];
        res.send(data);
    } else {
        res.send("Not found");
    }
});


/* Edit Quiz */
router.post("/edit/:quizNumber", function (req, res) {
    const quizNumber = req.body.quizNumber;
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
router.post("/delete", function (req, res) {
    const quizNumber = req.body.quizNumber;
    const database = JSON.parse(fs.readFileSync(databasePath));
    database.splice(quizNumber - 1, 1);
    fs.writeFileSync(databasePath, JSON.stringify(database, null, "\t"));
    res.sendStatus(200);
});


/* Restart Database */
router.post("/restart", function (req, res) {
    const database = JSON.parse(fs.readFileSync(backupDatabasePath));
    fs.writeFileSync(databasePath, JSON.stringify(database, null, "\t"));
    res.send(200);
});


module.exports = router;
