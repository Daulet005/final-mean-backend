const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регистрация
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Проверка на существующего пользователя
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание пользователя
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', // По умолчанию 'user'
        });

        res.status(201).json({ userId: user._id, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }

};

// Логин
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Валидация входных данных
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email и пароль обязательны для заполнения'
            });
        }

        // Поиск пользователя
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Пользователь с таким email не найден'
            });
        }

        // Проверка пароля
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Неверный пароль. Попробуйте снова или восстановите пароль'
            });
        }

        // Генерация JWT-токена
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            message: 'Вход выполнен успешно!'
        });
    } catch (error) {
        console.error('Ошибка входа:', error);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка сервера. Пожалуйста, попробуйте позже'
        });
    }
};