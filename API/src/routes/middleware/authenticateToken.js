const jwt = require('jsonwebtoken');
const logger = require('../../lib/logs');


const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        logger.error('This request must be authenticated and no token was found');
        return res.sendStatus(401).json('This request must be authenticated and no token was found');
    }; // Si no hay token, devuelve 401

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            logger.error(`Invalid token: ${err}`);
            return res.sendStatus(403).json({error: 'Unauthorized'}); // Si el token no es válido, devuelve 403
        }

        req.user = user;
        next(); // Si el token es válido, pasa al siguiente middleware o ruta
    });
};

module.exports = authenticateToken;
