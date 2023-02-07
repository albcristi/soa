'use strict';

const controller = require('../controller/productsController');

module.exports = (app) => {
    app.route('/products').get(controller.getProducts);
}
