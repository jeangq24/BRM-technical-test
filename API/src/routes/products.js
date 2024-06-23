const { Router } = require('express');
const router = Router();
const logger = require('../lib/logs');
const  {Product}  = require('../db.js');
const authenticateToken = require('./middleware/authenticateToken');

/**
 * @api {post} /products Request created Product
 * @apiName PostProduct
 * @apiGroup Products
 *
 * @apiBody {name} name Product String.
 * @apiBody {lot_number} lot_number Product String.
 * @apiBody {price} price Product Double.
 * @apiBody {stock} stock Product Integer.
 * @apiBody {entry_date} entry date Product String.
 *
 * @apiSuccess {JSON} Object product.
 */
router.post('/', authenticateToken, async (req, res) => {
    try {
        //Se valida que el usuario sea administrador
        console.log(req.user)
        if(req?.user?.rol !== 'Admin') {
            logger.error('To perform this action your account must have an administrator role');
            return res.status(200).json({error: `To perform this action your account must have an administrator role`});
        };
        
        const {name, lot_number, price, stock, entry_date } = req?.body;

        if(!name || !lot_number || !price || !stock || !entry_date) {
            logger.info(`Failed. The data necessary for this request has not been sent: name lotnumber price stock entry date`);
            return res.status(200).json({error: `Failed. The data necessary for this request has not been sent: name lotnumber price stock entry date`});
        };
        
        const createdProduct = await Product.create({name, lot_number, price, stock, entry_date});
        logger.info('Successfully created product')
        res.status(200).json(createdProduct);

    } catch (error) {
       
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @api {get} /products Request Products list
 * @apiName GetProducts
 * @apiGroup Products
 *
 * @apiParam {Number} id Product unique ID.
 *
 * @apiSuccess {JSON} Array of the products.
 */

router.get('/', authenticateToken, async (req, res) => {
    try {
        const productsList = await Product.findAll();
        res.status(200).json(productsList);
    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lot_number, price, stock, entry_date } = req.body;
        const product = await Product.findByPk(id);
        
        if (!product) {
            logger.error('Product not found');
            return res.status(200).json({ error: 'Product not found' });
        };

        product.name = name || product.name;
        product.lot_number = lot_number || product.lot_number;
        product.price = price || product.price;
        product.stock = ((stock < 0) ? false : stock) || product.stock;
        product.entry_date = entry_date || product.entry_date;

        await product.save();

        logger.info('The product was successfully updated');
        return res.status(200).json(product);
        
    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            logger.error('Product not found');
            return res.status(200).json({ error: 'Product not found' });
        };

        await product.destroy();
        logger.error("Product deleted successfully");
        return res.status(200).json({ message: 'Product deleted successfully' });
        
    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };
});

module.exports = router;