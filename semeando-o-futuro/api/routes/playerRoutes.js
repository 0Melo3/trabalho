const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/', playerController.getAll);
router.post('/register', playerController.register);
router.post('/login', playerController.login);
router.get('/profile', playerController.getProfile);
router.put('/:idDoUsuario', playerController.updatePlayer);
router.delete('/:idDoUsuario', playerController.deletePlayer);

module.exports = router;
