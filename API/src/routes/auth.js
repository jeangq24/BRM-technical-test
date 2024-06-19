const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const logger = require('../lib/logs');
const {User} = require('../db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

router.post('/', async (req, res) => {
    try {
        const {email, password} = req?.body;
        
        if( !email || !password) {
            throw (`Failed. The data necessary for this request has not been sent: email, password.`)
        };
        let infoString;
        const user = await User.findOne({ where: { email } });
        if(!user) {
            infoString = 'User not found';
            logger.error(infoString)
            return res.status(404).json({ error: infoString});
        };

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            infoString = 'Invalid password'
            return res.status(401).json({ error: infoString });
        };

        const token = jwt.sign({ id: user.id, username: user.username, email: user.email, rol: 1}, SECRET_KEY, { expiresIn: '24h' });
        infoString = 'Login completed'
        logger.info(infoString);
        const {id, username, personId} = user;
        return res.status(200).json({token, user: {
            id,
            email: user.email,
            username,
            personId
        } });

    } catch (error) {
       
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;