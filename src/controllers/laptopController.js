const Laptop = require('../models/Laptop');

// Получить все ноутбуки
exports.getAllLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.status(200).json(laptops);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Создать новый ноутбук
exports.createLaptop = async (req, res) => {
    try {
        const laptopData = req.body;
        if (!Array.isArray(laptopData.images) || laptopData.images.length === 0) {
            return res.status(400).json({ error: 'At least one image URL is required' });
        }
        const laptop = await Laptop.create(laptopData);
        res.status(201).json(laptop);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Получить один ноутбук
exports.getLaptopById = async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        if (!laptop) {
            return res.status(404).json({ error: 'Laptop not found' });
        }
        res.status(200).json(laptop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Обновить ноутбук
exports.updateLaptop = async (req, res) => {
    try {
        const laptopData = req.body;
        if (laptopData.images && (!Array.isArray(laptopData.images) || laptopData.images.length === 0)) {
            return res.status(400).json({ error: 'At least one image URL is required' });
        }
        const laptop = await Laptop.findByIdAndUpdate(
            req.params.id,
            laptopData,
            { new: true, runValidators: true }
        );
        if (!laptop) {
            return res.status(404).json({ error: 'Laptop not found' });
        }
        res.status(200).json(laptop);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Удалить ноутбук
exports.deleteLaptop = async (req, res) => {
    try {
        const laptop = await Laptop.findByIdAndDelete(req.params.id);
        if (!laptop) {
            return res.status(404).json({ error: 'Laptop not found' });
        }
        res.status(200).json({ message: 'Laptop deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
