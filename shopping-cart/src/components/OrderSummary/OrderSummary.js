import React from 'react';


const OrderSummary = (props) => {
    const cartItems = props.cartItems;
    const getOrderTotal = () => {
        let total = 0
        let currency = ""
        cartItems.forEach(cartItem => {
            const priceArr = cartItem.price.split(' ')
            currency = priceArr[1]
            let price = parseFloat(priceArr[0])
            console.log(price)
            total = total + price;
        })
        return `${total} ${currency}`;
    }
    return (
        <div>
            { cartItems !== undefined && cartItems.map((cartItem, index) => {

                return (
                    <div className="container" key={index}>
                        <p className="card-title" style={{fontSize: "25px"}}>{index+1}. {cartItem.title}</p>
                        <p className="card-subtitle mb-2 text-muted"  style={{fontSize: "25px"}}>Price: {cartItem.price}</p>
                        <hr/>
                    </div>
                )
            })}

            {cartItems !== undefined && cartItems.length >0 &&
                <div>
                    <p className="card-subtitle mb-2 text-muted"  style={{fontSize: "25px"}}>Total: {getOrderTotal()}</p>
                </div>
            }
        </div>
    )
}

export default OrderSummary;