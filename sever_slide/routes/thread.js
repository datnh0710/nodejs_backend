const express = require('express');
const controller = require('../controllers/threadController');
const router = express.Router()


router.get('/thread/:_id',controller.getThreadByID);
router.get('/thread/:name',controller.getThreadByName);
router.get('/thread/:creater',controller.getThreadByCreator);
router.get('/thread/:categoryID',controller.getThreadByCategoryID);
router.get('/thread',controller.getAllThread);
router.post('/thread',controller.addNewThread);
router.put('/thread/:_id',  controller.updateThreadByID);
router.delete('/thread/:_id',  controller.deleteThreadByID);
module.exports = router;