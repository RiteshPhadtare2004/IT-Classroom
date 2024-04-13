const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup);
router.post('/login', userController.login);

<<<<<<< HEAD



=======
>>>>>>> c241ee88f92f94fba6b158a942c5098c4d05088c
module.exports = router;
