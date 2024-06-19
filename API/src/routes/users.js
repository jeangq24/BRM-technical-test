const { Router } = require('express');
const router = Router();
const logger = require('../lib/logs');
const {Person, User} = require('../db');
const { Op } = require('sequelize');

router.post('/', async (req, res) => {
    try {
        const {name, last_name, birthdate, username, email, password} = req?.body;
        
        if(!name || !last_name || !birthdate || !username || !email || !password) {
            logger.info(`Failed. The data necessary for this request has not been sent: name, surname, date of birth, username, email and password.`);
            return res.status(400).json({error: `Failed. The data necessary for this request has not been sent: name, surname, date of birth, username, email and password.`});
        };

        const exitsUser = await User.findAll({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        });

        if(exitsUser?.length > 0) {
            logger.info(`The user already exists, please select another email or username.`);
            return res.status(400).json({error: 'The user already exists, please select another email or username.'});
        };

     
        const createdPerson = await Person.create({name, last_name, birthdate});
        const createdUser = await User.create({ username, email, personId: createdPerson.id, password, rolId: 1});
        await createdUser.setPerson(createdPerson);
      
        logger.info('User created successfully');
        return res.status(200).json(createdUser);

    } catch (error) {
       
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;