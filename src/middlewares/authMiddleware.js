const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded);

        // Приводим decoded к нужному виду
        req.user = {
            id: decoded.userId,  // <-- здесь userId, как в токене
            role: decoded.role
        };


        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Admin access required' });
}

module.exports = {
    authenticate,
    isAdmin,
};
