import {useState, useEffect} from "react";
import axios from "axios";
import Product from "../Product/Product";

const ProductsList = (props) => {
    const [products, setProducts] = useState([]);
    const itemAddedToCartEvent = props.itemAddedToCartEvent;

    useEffect(() => {
        axios.get(`http://localhost:8090/api/products`)
            .then((res) => setProducts(res.data));
    }, [])

    return (
        <div>
            {products.length !== 0 && products.map((product, index) => {
                return (
                    <div key={index} className="container" style={{paddingBottom: "1vh"}}>
                        <Product productItem={product} itemAddedToCartEvent={itemAddedToCartEvent}/>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductsList;