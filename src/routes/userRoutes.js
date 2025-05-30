const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Получить пользователя по ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // исключаем пароль
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
});

// Обновить пользователя по ID
router.put('/users/:id', async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
        res.json({ message: 'Пользователь обновлен', user });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера', error: err.message });
    }
});

module.exports = router;
