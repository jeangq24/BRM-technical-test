const { Router } = require('express');
const router = Router();
const logger = require('../lib/logs');
const { Sale, Product } = require('../db.js');
const authenticateToken = require('./middleware/authenticateToken');

router.post('/', authenticateToken, async (req, res) => {
    try {

        const { productsList } = req?.body;

        if (!productsList || productsList.length <= 0) {
            logger.info(`Failed. The data necessary for this request has not been sent: products list`);
            return res.status(200).json({ error: `Failed. The data necessary for this request has not been sent: products list` });
        };
        let total = 0;
        let messageFailed;
        const promisesUpdateProduct = [];
        const productInstances = [];

        for (let index = 0; index < productsList.length; index++) {
            const product = productsList[index];
            const productDB = await Product.findByPk(product?.id);

            if (!productDB) {
                messageFailed = `Product with id ${product?.id} not found`;
                logger.error(messageFailed);
                return res.status(200).json({ error: messageFailed });
            };

            total += Number(productDB.price) * product.amount;
            const currentStockProduct = productDB.stock - product.amount;

            if (currentStockProduct < 0) {
                messageFailed = 'It is not possible to deduct the quantity from the product stock.'
                logger.error(messageFailed);
                return res.status(200).json({ error: `It is not possible to deduct the quantity from the product stock.` });
            } else {
                productDB.stock = currentStockProduct;
                promisesUpdateProduct.push(productDB.save());
                productInstances.push(productDB);
            };

        };

        await Promise.all(promisesUpdateProduct);
        logger.info('Products updates');

        const createdSale = await Sale.create({ total, userId: req?.user?.id,  });
        await createdSale.addProducts(productInstances);
        const saleWithProducts = await Sale.findOne({
            where: { id: createdSale.id },
            include: Product
        });

        logger.info('Successfully created sale');
        return res.status(200).json(saleWithProducts);

    } catch (error) {

        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };
});


router.get('/', authenticateToken, async (req, res) => {
    try {
        const { id } = req?.user;
        const saleWithProducts = await Sale.findAll({
            where: { userId: id },
            include: Product
        });

        return res.status(200).json(saleWithProducts);
    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };
});




module.exports = router;

