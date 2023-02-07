'use strict';
const axios = require("axios");
const {SHOPPING_ORDERS_URL, SHOPPING_PRODUCTS_URL} = require("../config");
const service = {
    getProducts: async () => {
        const products = [];
        await axios.get(`${SHOPPING_PRODUCTS_URL}/products`)
            .then((res) => products.push(...res.data));
        return products;
    },

    getUserUnfinishedOrder: async (clientIp) => {
        let order = undefined;
        await axios.get(`${SHOPPING_ORDERS_URL}/unfinishedOrder?client=${clientIp}`)
            .then(res => {order = res.data})
        console.log(`Received back: ${order}`)
        return order;
    },

    addProductToUnfinishedOrder: async (clientIp, newProduct) => {
        let operationResult = undefined;
        await axios.post(`${SHOPPING_ORDERS_URL}/unfinishedOrder`, {client: clientIp, product: newProduct})
            .then(result => {
                operationResult = result.data
            })
        return operationResult
    },

    removeItemUnfinishedOrder: async (clientIp, productToBeRemoved) => {
        let operationResult = undefined
        await axios.post(`${SHOPPING_ORDERS_URL}/removeItemUnfinishedOrder`, {client: clientIp, product: productToBeRemoved})
            .then(result => {
                operationResult = result.data;
            })
        return operationResult;
    },


    finishOrder: async (orderDetails) => {
        let userCartItems = undefined
        await axios.post(`${SHOPPING_ORDERS_URL}/finishOrder`, orderDetails)
            .then((res) => userCartItems = res.data);
        return userCartItems;
    }
};

module.exports = service;
