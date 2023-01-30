const express = require('express');
const controller = require('../controllers/categoryController');
const router = express.Router()

router.get('/category/:_id',controller.getCategoryByID);
router.get('/category/:name',controller.getCategoryByName);
router.get('/category/:creator',controller.getCategoryByCreator);
router.get('/category',controller.getAllCategory);
router.post('/category',controller.addNewCategory);
router.put('/category/:_id',  controller.updateCategoryByID);
router.delete('/category/:_id',  controller.deleteCategoryByID);

module.exports = router;