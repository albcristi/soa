'use strict';

const controller = require('../controller/orderController');

module.exports = (app) => {
    app.route('/unfinishedOrder').get(controller.retrieveUnfinishedOrder);
    app.route('/unfinishedOrder').post(controller.addProductToUnfinishedOrder);
    app.route('/removeItemUnfinishedOrder').post(controller.removeProductFromUnfinishedOrder);
    app.route('/finishOrder').post(controller.finishOrder);
}
