const express = require('express');
const controller = require('../controllers/postController');
const router = express.Router()


router.get('/post/:_id', controller.getPostByID);
router.get('/post/:name', controller.getPostByName);
router.get('/post/:creater',controller.getPostByCreator);
router.get('/post/:threadID',controller.getPostByThreadID);
router.get('/post', controller.getAllPost);
router.post('/post', controller.addNewPost);
router.put('/post/:_id', controller.updatePostByID);
router.delete('/post/:_id', controller.deletePostByID);

module.exports = router;