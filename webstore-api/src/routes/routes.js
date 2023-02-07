'use strict';

const controller = require('../controller/controller');

module.exports = (app) => {
    app.route('/api/products').get(controller.getProducts);
    app.route('/api/unfinishedOrder').get(controller.getUserUnfinishedOrder);
    app.route('/api/unfinishedOrder').post(controller.addNewProductToUnfinishedOrder);
    app.route('/api/removeItemUnfinishedOrder').post(controller.removeItemUnfinishedOrder);
    app.route('/api/finishOrder').post(controller.finishOrder);
}
