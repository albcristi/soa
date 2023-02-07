const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8080;
const SHOPPING_PRODUCTS_URL = process.env.SHOPPING_PRODUCTS_URL || 'http://localhost:8081';
const SHOPPING_ORDERS_URL = process.env.SHOPPING_ORDERS_URL || 'http://localhost:8082';

module.exports = {
    PORT, SHOPPING_PRODUCTS_URL, SHOPPING_ORDERS_URL
}
