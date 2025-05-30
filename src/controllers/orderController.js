const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    const { userId, totalPrice } = req.body;

    if (!userId || totalPrice == null) {
        return res.status(400).json({ message: 'userId и totalPrice обязательны' });
    }

    try {
        const newOrder = await Order.create({ userId, totalPrice });
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при создании заказа', error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Заказ не найден' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
