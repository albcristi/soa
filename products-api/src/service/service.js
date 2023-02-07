'use strict';
const repository = require('../repository/repository');

const service = {
    getAllProducts: async () => {
        return await repository.getAllProducts();
    }
};

module.exports = service;
