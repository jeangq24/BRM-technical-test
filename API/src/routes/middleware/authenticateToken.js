const jwt = require('jsonwebtoken');
const logger = require('../../lib/logs');


const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        logger.error('This request must be authenticated and no token was found');
        return res.sendStatus(200).json('This request must be authenticated and no token was found');
    };

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            logger.error(`Invalid token: ${err}`);
            return res.sendStatus(200).json({error: 'Unauthorized'});
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
