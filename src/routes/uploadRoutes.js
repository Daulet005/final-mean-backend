const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

// Обязательно именно `/upload` (не `/api/upload` — префикс добавляется в app.js)
router.post('/upload', upload.single('images', 5), (req, res) => {
    if (!req.files) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const filesUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    res.json({ uploaded: true, files: filesUrls });
});

module.exports = router;
