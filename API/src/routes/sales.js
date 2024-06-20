const { Router } = require('express');
const router = Router();
const logger = require('../lib/logs');
const  {Sale, Product}  = require('../db.js');
const authenticateToken = require('./middleware/authenticateToken');

router.post('/', authenticateToken, async (req, res) => {
    try {
        
        const { productsList } = req?.body;

        if(!productsList || productsList.length <= 0) {
            logger.info(`Failed. The data necessary for this request has not been sent: products list`);
            return res.status(400).json({error: `Failed. The data necessary for this request has not been sent: products list`});
        };
        const currentDate = new Date();
        let total=0;
        let failedNumber= false;
        let messageFailed;
        const promisesUpdateProduct = []
        for (let index = 0; index < productsList.length; index++) {
            const product = productsList[index];
            if(typeof Number(product?.price) !== 'number') {
                messageFailed = 'The price of the products on the list must be a number'
                logger.error(messageFailed);
                failedNumber = true;
                return;
            };
            total = total + Number(product?.price)
            const productDB = Product.findByPk(product?.id);
            const currentStockProduct = productDB.stock - product?.amount;
            if(currentStockProduct < 0) {
                messageFailed = 'It is not possible to deduct the quantity from the product stock.'
                logger.error(messageFailed);
                return;
            }else {
                productDB.stock = currentStockProduct
                promisesUpdateProduct.push(productDB.save());
            };

        };

        if(failedNumber) {
            return res.status(400).json({error: messageFailed});
        };

        await Promise.all(promisesUpdateProduct);
        logger.info('Products updates');

        const createdProduct = await Sale.create({date: currentDate, total, userId: req?.user?.id});
        logger.log('Successfully created sale')
        res.status(200).json(createdProduct);

    } catch (error) {
       
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;

