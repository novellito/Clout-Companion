const express = require('express');
const controller = require('../controllers/user');
const { authorize } = require('../controllers/login');
let router = express.Router();

router.get('/:id', authorize, controller.getUserInfo);
router.post('/', authorize, controller.insertItem);
router.put('/updateItem', authorize, controller.updateItem);
router.delete('/deleteItem', authorize, controller.deleteItem);

module.exports = router;
