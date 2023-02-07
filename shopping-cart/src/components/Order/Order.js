import React, {useState, useEffect} from 'react';
import OrderSummary from "../OrderSummary/OrderSummary";
import SendOrder from "../SendOrder/SendOrder";
import axios from 'axios';

const Order = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const [cartItems, setCartItems] = useState(undefined);
    const [orderStatus, setOrderStatus] = useState(undefined)

    const fetchCachedOrder = () => {
        const ipAddress = sessionStorage.getItem('clientIp')
        axios.get(`http://localhost:8090/api/unfinishedOrder?client=${ipAddress}`)
            .then(result => {
                let items = result.data.products
                console.log(items);
                setCartItems(items);
            })
    }

    const orderSent = () => {
        setOrderStatus(sessionStorage.getItem('orderStatus'))
        setCurrentStep(2);
    }

    useEffect(() => {
        fetchCachedOrder();
        window.addEventListener('itemAddedToCart', () => {console.log('UPDATE EVENT'); fetchCachedOrder()})
        window.addEventListener('orderSent', () => {orderSent()})
    }, [])


    return (
        <div className="container">
            <div>
                <p className="font-weight-light text-primary" style={{fontSize: "32px"}}>Current step: {currentStep === 0 ? 'Customer Details' : ( currentStep === 1 ? 'Order Summary & Review': 'Thank you for your order!')}</p>
                <hr/>
                {currentStep === 0 &&
                    <div>
                        <OrderSummary cartItems={cartItems}/>
                        <div className="d-flex justify-content-end">
                            <p className="font-weight-light text-primary" style={{fontSize: "32px"}} onClick={()=>{setCurrentStep(1)}}>Next</p>
                        </div>
                    </div>
                }
                {currentStep === 1 &&
                    <div>
                       <SendOrder/>
                    </div>
                }

                {currentStep === 2 &&
                    <div className="d-flex justify-content-center">
                        <div className="container">
                            <p style={{marginTop: "5vh"}}>We've sent you an email containing the order summary!</p>
                            <p>PS: Check your spam in case you don't see it in your inbox</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Order;