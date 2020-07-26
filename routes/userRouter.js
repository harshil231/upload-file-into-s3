const express = require('express');

const app = express();

var router = express.Router();

userController = require('../controller/userController')

router.post('/save/profile/image', userController.saveProfileImage)

module.exports = router;
