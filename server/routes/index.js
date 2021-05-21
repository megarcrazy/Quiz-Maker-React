var express = require('express');
var cors = require('cors')
var router = express.Router();
router.use(cors())

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get data from data base */
router.get('/data', function(req, res) {
  const dataBase = JSON.parse(fs.readFileSync('./dataBase/quizData.json'));
  res.send(dataBase);
});

router.get('/data/:quizNumber', function(req, res) {
  const dataBase = JSON.parse(fs.readFileSync('./dataBase/quizData.json'));
  const quizNumber = req.params.quizNumber;
  if (quizNumber >= 1 && quizNumber <= dataBase.length) {
    const data = dataBase[quizNumber - 1];
    res.send(data);
  }
  res.send("Not found");
});

module.exports = router;
