const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8081;
const REDIS_URL = process.env.REDIS_URL || '';
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || '';
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || '';
const MAILGUN_EMAIL = process.env.MAILGUN_EMAIL || '';


module.exports = {
    REDIS_URL, PORT, MAILGUN_DOMAIN, MAILGUN_API_KEY, MAILGUN_EMAIL
}
