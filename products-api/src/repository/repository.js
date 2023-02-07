'use strict';
const storage = require('node-persist');

const read = async (key) => {
    const value = await storage.getItem(key);
    if(value){
        return JSON.parse(value);
    }
    return [];
}

const repository = {

    getAllProducts: async () => {
        return await read('products');
    }
};

module.exports = repository;
