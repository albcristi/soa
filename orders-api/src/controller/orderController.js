'use strict';

const service = require('../service/service');

const orderController = {
    retrieveUnfinishedOrder: async  (req, res) => {
        console.log(`controller.retrieveUnfinishedOrder()`)
        const clientIp = req.query.client
        const unfinishedOrder = await service.getUserUnfinishedOrder(clientIp)
        res.json(unfinishedOrder)
    },

    addProductToUnfinishedOrder: async (req, res) => {
        console.log(`controller.addProductToUnfinishedOrder()`)
        const clientIp = req.body.client
        const product = req.body.product;
        const result = await service.addProductToUnfinishedOrder(clientIp, product);
        res.json(result)
    },

    removeProductFromUnfinishedOrder: async (req, res) => {
        console.log(`controller.removeProductFromUnfinishedOrder()`)
        const clientIp = req.body.client
        const product = req.body.product;
        const result = await service.removeProductFromUnfinishedOrder(clientIp, product);
        res.json(result)
    },

    finishOrder: async (req, res) => {
        console.log(`controller.finishOrder()`)
        const userData = req.body
        const response = await service.finishOrder(userData);
        res.status(200);
        res.json(response);
    },
};

module.exports = orderController;
