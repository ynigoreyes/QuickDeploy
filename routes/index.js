const express = require('express');
const router = express.Router();
const shell = require('shelljs');

/* GET home page. */
router.post('/', function(req, res, next) {
  let payload = req.body;
  if (payload.repository.is_trusted && payload.push_data.tag === 'latest') {
    shell.exec('/home/ubuntu/deploy-server/deploy.sh')
    res.send('Deploying new version of website...\n');
  }
  res.send('Branch is not latest or an unauthorized post has been made')
});

module.exports = router;
