const jwt = require('jsonwebtoken');

function authenticateRole(roles) {
    return function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.sendStatus(401); // 'Non autorisé' s'il n'y a pas de jeton

        jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
            if (err) return res.sendStatus(403); // "Interdit" si le jeton n'est pas valide

            // Vérifie que l'utilisateur a l'un des rôles requis
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden - wrong role' });
            }
            req.user = user; // Transmettre les informations relatives à l'utilisateur à l'objet de la demande

            next(); // Passer à l'intergiciel suivant
        });
    };
}

module.exports = authenticateRole;
