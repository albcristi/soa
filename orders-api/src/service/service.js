'use strict';

const { REDIS_URL, MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_EMAIL} = require("../config");
const util = require('util')
const redis = require('redis');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

let auth = {
    auth:
        {
            api_key: MAILGUN_API_KEY,
            domain: MAILGUN_DOMAIN
        }
}

const transporter = nodemailer.createTransport(mailGun(auth));

const redisClient = redis.createClient({
    url: REDIS_URL,
    legacyMode: true
});

redisClient.on('error', err => {
    console.log("Error Encountered on Redis:")
    console.log(err)
})

const  establishRedisConnection =  async () => {
    try {
        await redisClient.connect()
    }
    catch (e){
        // means we are connected
    }
}

const service = {


    getUserUnfinishedOrder: async (clientIp) => {
        console.log(`service.GetUserUnfinishedOrder(${clientIp}): ENTERED FUNCTION`)
        await establishRedisConnection()
        let result = await util.promisify(redisClient.get).bind(redisClient)(clientIp);
        if(result === undefined || result === null)
            return {products: []}
        result = JSON.parse(result)
        try {
            console.log("service.GetUserUnfinishedOrder: EXIT FUNCTION")
            console.log(result)
            return result
        }
        catch (e){
            console.log("getUserUnfinishedOrder: ENCOUNTERED ERROR:")
            console.log(e)
            return {products: []}
        }
    },

    addProductToUnfinishedOrder: async (clientIp, newProduct) => {
        console.log(`service.addProductToUnfinishedOrder(${clientIp}, ${newProduct}) -- ENTERED FUNCTION`)
        let currentOrder = await service.getUserUnfinishedOrder(clientIp)
        currentOrder.products.push(newProduct);
        currentOrder = JSON.stringify(currentOrder)
        await util.promisify(redisClient.set).bind(redisClient)(clientIp, currentOrder);
        let updatedOrder = await service.getUserUnfinishedOrder(clientIp);
        console.log(`service.addProductToUnfinishedOrder returns:  ${updatedOrder.products.length} items`)
        return updatedOrder
    },

    removeProductFromUnfinishedOrder: async (clientIp, productToBeRemoved) => {
        console.log(`service.removeProductFromUnfinishedOrder(${clientIp}, ${productToBeRemoved}) -- ENTERED FUNCTION`)
        let currentOrder = await service.getUserUnfinishedOrder(clientIp)
        currentOrder.products = currentOrder.products.filter(product => product.productId !== productToBeRemoved)
        currentOrder = JSON.stringify(currentOrder)
        await util.promisify(redisClient.set).bind(redisClient)(clientIp, currentOrder);
        let modifiedOrder = await service.getUserUnfinishedOrder(clientIp);
        console.log(`service.removeProductFromUnfinishedOrder returns: ${modifiedOrder.products.length} items`)
        return modifiedOrder
    },

    removeOrderFromCache: async (clientIp) => {
        await establishRedisConnection();
        await util.promisify(redisClient.del).bind(redisClient)(clientIp);
    },

    emailContent: (customerOrderList, customerData) => {

        let orderDetailTable = '';
        let index = 1;
        let tableEntries = '';
        let total = 0;
        let currency = ""
        customerOrderList.forEach(item => {
            let priceArray = item.price.split(' ')
            total = total + parseFloat(priceArray[0])
            currency = priceArray[1]
            tableEntries = tableEntries.concat(`<tr style=${index%2===1 ? "background-color: #ddd;" : "background-color: #f2f2f2;"}> 
                                    <td style="border: 1px solid #ddd; padding: 8px;">${index}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${item.title}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${item.price}</td>
                                 </tr>`)
            index = index +1;
        })

        orderDetailTable = `<table style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
                                  <tr>
                                    <th style="border: 1px solid #ddd; padding: 8px;  padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D;color: white;">Item No.</th>
                                    <th style="border: 1px solid #ddd; padding: 8px;  padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D;color: white;">Product</th>
                                    <th style="border: 1px solid #ddd; padding: 8px;  padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #04AA6D;color: white;">Price</th>
                                  </tr>
                                  ${tableEntries}
                            </table>`


        return `
                <div>
                    <h1>Dear, ${customerData.name}</h1>
                    <hr>
                    <h4>We have registered the following order:</h4>
                    ${orderDetailTable}
                    <h4>Total: ${total} ${currency}</h6>
                    <h2>Shipping Details:</h2>
                    <hr>
                    <p> <b>Phone Number:</b> ${customerData.phone} </p>
                    <p> <b>Address:</b> ${customerData.address} </p>
                </div>
            `
    },

    finishOrder: async (orderDetails) => {
        console.log(`service.removeProductFromUnfinishedOrder(${orderDetails}}) -- ENTERED FUNCTION`)
        let userOrder = await service.getUserUnfinishedOrder(orderDetails.client)
        await service.removeOrderFromCache(orderDetails.client)

        const data = {
            from: MAILGUN_EMAIL,
            to: orderDetails.email,
            subject: 'Airplane E-SHOP Order',
            html: `<html> <body> ${service.emailContent(userOrder.products, orderDetails)} </body> </html>`
        };

        transporter.sendMail(data);
        return await service.getUserUnfinishedOrder(orderDetails.client);
    },
};

module.exports = service;
