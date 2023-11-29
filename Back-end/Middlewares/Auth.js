const jwt = require('jsonwebtoken');

function authenticateRole(role) {
    return function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.sendStatus(401); // 'Unauthorized' if there's no token

        jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
            if (err) return res.sendStatus(403); // 'Forbidden' if the token is invalid

            // Vérifie que l'utilisateur a le rôle requis
            if (user.role !== role) {
                return res.status(403).json({ message: 'Forbidden - wrong role' });
            }
            req.user = user; // Pass the user information to the request object

            next(); // Move to the next middleware
        });
    };
}

module.exports = authenticateRole;
