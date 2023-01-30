const express = require('express');

const controller = require('../controllers/userController');
const router = express.Router()

router.get('/profile/:username',controller.getUserByUserName);
router.post('/profile/:username',controller.updateUser);
router.post('/login',  controller.postLogin);
router.post('/register',  controller.postRegister);
router.post('/logout', controller.postLogout);
router.post('/forgot', controller.forgotUser);
router.delete('/delete/:username', controller.deleteUser);
router.post('/user/newCategory', controller.addNewCategory);


module.exports = router;
