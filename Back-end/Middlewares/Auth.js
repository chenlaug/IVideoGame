/**
 * Middleware d'authentification pour vérifier le rôle de l'utilisateur.
 * Ce middleware utilise JWT pour vérifier le jeton d'authentification et s'assurer
 * que l'utilisateur possède l'un des rôles requis pour accéder à une route spécifique.
 * 
 * @module authenticateRole
 * @requires jsonwebtoken
 */
const jwt = require('jsonwebtoken');

/**
 * Crée un middleware pour authentifier le rôle de l'utilisateur.
 * Ce middleware vérifie si l'utilisateur a l'un des rôles spécifiés dans le tableau 'roles'.
 * 
 * @param {string[]} roles - Un tableau de rôles autorisés.
 * @returns {Function} Middleware Express pour authentifier le rôle de l'utilisateur.
 */
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
