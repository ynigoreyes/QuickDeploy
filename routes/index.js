var express = require('express');
var router = express.Router();
const shell = require('shelljs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Successful\n');
  shell.exec('/home/ubuntu/deploy-server/deploy.sh')
});

module.exports = router;
