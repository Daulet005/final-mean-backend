const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const { authenticate: authMiddleware } = require('../middlewares/authMiddleware');

// Получить корзину пользователя
router.get('/', authMiddleware, async (req, res) => {
    try {
        const cartItems = await CartItem.find({ userId: req.user.id })
            .populate('laptopId')
            .lean(); // Преобразуем в обычный объект

        // Форматируем ответ для фронтенда
        const formattedItems = cartItems.map(item => ({
            id: item._id,
            quantity: item.quantity,
            Laptop: item.laptopId // Переименовываем laptopId в Laptop
        }));

        res.json(formattedItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Остальные методы остаются без изменений

// Добавить в корзину
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { laptopId, quantity = 1 } = req.body;
        const userId = req.user.id;

        const existingItem = await CartItem.findOne({ userId, laptopId });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.json(existingItem);
        }

        const newItem = new CartItem({ userId, laptopId, quantity });
        await newItem.save();

        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error in POST /cart:', error);  // <-- добавь
        res.status(500).json({ error: error.message });
    }
});


// Удалить из корзины
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deleted = await CartItem.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;