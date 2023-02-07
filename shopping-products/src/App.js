import "./index.css";
import ProductsList from "./components/ProductsList/ProductsList";
import React from "react";

const App = () => {
    const event = new Event('itemAddedToCart');

    const itemAddedToCart = () => {
        window.dispatchEvent(event);
    }

    return (
        <div>
            <div className="container">
                 <ProductsList itemAddedToCartEvent={itemAddedToCart}/>
            </div>
        </div>
    )
}

export default App;
