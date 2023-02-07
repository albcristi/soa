'use strict';

const service = require('../service/service');

const controller = {
    getProducts: async (req, res) => {
        const products = await service.getProducts();
        res.status(200);
        res.json(products);
    },

    getUserUnfinishedOrder: async (req, res) => {
        const clientIp = req.query.client
        const unfinishedOrder = await service.getUserUnfinishedOrder(clientIp);
        res.status(200);
        res.json(unfinishedOrder)
    },

    addNewProductToUnfinishedOrder: async (req, res) => {
        const clientIp = req.body.client;
        const product = req.body.product;
        console.log(product);
        const result = await service.addProductToUnfinishedOrder(clientIp, product);
        res.status(200);
        res.json(result);
    },

    removeItemUnfinishedOrder: async (req, res) => {
        const clientIp = req.body.client;
        const product = req.body.product;
        console.log(product);
        const result = await service.removeItemUnfinishedOrder(clientIp, product);
        res.status(200);
        res.json(result);
    },

    finishOrder: async (req, res) => {
        const userData = req.body
        const response = await service.finishOrder(userData);
        res.status(200);
        res.json(response);
    },
};

module.exports = controller;
