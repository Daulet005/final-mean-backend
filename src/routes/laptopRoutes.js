const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/laptopController');
const authMiddleware = require('../middlewares/authMiddleware');

// Публичные роуты
router.get('/', laptopController.getAllLaptops);
router.get('/:id', laptopController.getLaptopById);

// Защищённые роуты (требуют аутентификации)
router.use(authMiddleware.authenticate);

// Только для админов
router.post('/', authMiddleware.isAdmin, laptopController.createLaptop);
router.put('/:id', authMiddleware.isAdmin, laptopController.updateLaptop);
router.delete('/:id', authMiddleware.isAdmin, laptopController.deleteLaptop);

module.exports = router;