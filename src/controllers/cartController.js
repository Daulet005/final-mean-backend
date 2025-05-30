// cartController.js
const { Cart, CartItem, Laptop } = require('../models'); // Проверьте путь!

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: { userId: req.user.id },
            include: [
                {
                    model: CartItem, // Убедитесь, что название модели совпадает
                    include: [Laptop] // Если нужно подгрузить данные о товарах
                }
            ]
        });

        if (!cart) {
            return res.json({ items: [] }); // Пустая корзина
        }

        res.json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
};