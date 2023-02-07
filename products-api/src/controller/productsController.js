'use strict';

const service = require('../service/service');

const productsController = {
    getProducts: async (req, res) => {
         const products = await service.getAllProducts();
         res.json(products);
    }
};

module.exports = productsController;
