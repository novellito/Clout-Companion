const express = require('express');
const controller = require('../controllers/user');
let router = express.Router();

router.get('/:id', controller.getUserInfo);
router.post('/', controller.insertItem);
router.put('/updateItem', controller.updateItem);

module.exports = router;
