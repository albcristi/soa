import React, {useEffect, useState} from "react";
import "./index.css";
import {CartItems} from "./model/CartItems";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import './app.css'

const App = () => {
    const [cartItems, setCartItems] = useState(new CartItems(-1,[]))
    const [showProductsPage, setShowProductsPage] = useState(true);

    const fetchCachedOrder =  async function (propagateLocalStorageUpdate) {
        let ipAddress = "";
        if(sessionStorage.getItem('clientIp') === undefined || sessionStorage.getItem('clientIp') === null) {
            const res = await axios.get('https://geolocation-db.com/json/')
            ipAddress = res.data.IPv4
            sessionStorage.setItem("clientIp", ipAddress);
        }
        else {
            console.log('HAS IP ALREADY')
            ipAddress = sessionStorage.getItem('clientIp')
        }
        axios.get(`http://localhost:8090/api/unfinishedOrder?client=${ipAddress}`)
            .then(result => {
                let items = result.data.products
                let newCart = new CartItems(items.length, items);
                sessionStorage.setItem("cartItems", JSON.stringify(newCart.items))
                if(propagateLocalStorageUpdate)
                    window.dispatchEvent(new Event("cartItemsUpdated"))
                setCartItems(newCart);
            })
    }


    useEffect(() => {
        fetchCachedOrder(true).then()
        window.addEventListener('itemAddedToCart', () => {fetchCachedOrder(false).then()});
        window.addEventListener('orderProcessed', () => {fetchCachedOrder(true).then()})
        window.addEventListener('cartClicked', () => {console.log("SHOW CARRT");setShowProductsPage(false)})
        window.addEventListener('productsClicked', () => {console.log("SHOW PRODUCTS");setShowProductsPage(true)})
    },[])

    return (
      <div>
          <Navbar cartItems={cartItems}/>
          <div id="root--shoppingProducts" className={`shopping-component${showProductsPage ? '' : '-hidden'}`}/>
          <div id="root--shoppingCart" className={`shopping-component${showProductsPage ? '-hidden' : ''}`}/>
      </div>
)}

export default App;