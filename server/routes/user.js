const express = require('express');
const controller = require('../controllers/user');
let router = express.Router();

router.get('/', function(req, res) {
  console.log('hello world');
  res.send('helli');
});
router.post('/', controller.insertItem);
router.post('/updateItem', controller.updateItem); // put?

module.exports = router;
