import React, {useState} from 'react';
import axios from 'axios';


const SendOrder = () => {
    const [isSending, setIsSending] = useState(false)

    const sendOrderCommand = (event) => {
        if(isSending)
            return
        setIsSending(true)
        const customerName = event.target['inputName'].value
        const customerEmail = event.target['email'].value
        const customerPhoneNumber = event.target['phoneNumber'].value
        const customerAddress = event.target['inputAddress'].value
        const order = {
            name: customerName,
            address: customerAddress,
            email: customerEmail,
            phone: customerPhoneNumber,
            client: sessionStorage.getItem("clientIp")
        }
        axios.post(`http://localhost:8090/api/finishOrder`, order)
            .then(result => {
                setIsSending(false)
                console.log(result.data)
                sessionStorage.setItem("cartItems", JSON.stringify(result.data.products))
                window.dispatchEvent(new Event("orderProcessed"))
                sessionStorage.setItem('orderStatus', result.data.products.length === 0 ? "OK" : "FAILED")
                window.dispatchEvent(new Event('orderSent'))
            })
    }

    return (
        <div style={{marginTop: '2vh'}}>
            <form onSubmit={(event) => {event.preventDefault(); sendOrderCommand(event)}}>
                <div className="form-group">
                    <label htmlFor="inputName"  style={{fontSize: "25px"}}>Full Name</label>
                    <input type="text" className="form-control"  style={{fontSize: "25px"}} id="inputName" placeholder="Calin Barbur" required/>
                </div>

                <div className="d-flex">
                    <div className="form-group" style={{marginRight: "2vw"}}>
                        <label htmlFor="email" style={{fontSize: "25px"}}>Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Email" style={{fontSize: "25px"}} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber" style={{fontSize: "25px"}}>Phone Number</label>
                        <input type="text"  style={{fontSize: "25px"}} className="form-control" id="phoneNumber" placeholder="Phone Number" required/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress"  style={{fontSize: "25px"}}>Shipping Address</label>
                    <input type="text" className="form-control"  style={{fontSize: "25px"}} id="inputAddress" placeholder="Apt 67, 1234 Main St, Cluj-Napoca, RO" required/>
                </div>

                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" required/>
                            <label className="form-check-label" htmlFor="gridCheck"  style={{fontSize: "25px"}}>
                                I agree with the terms and the conditions of Airplanes E-Shop
                            </label>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <div>
                        <button type="submit" className="btn btn-outline-success">
                            {!isSending && 'Send Order'}
                            {isSending && <div className="spinner-border text-primary" role="status"/>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SendOrder;