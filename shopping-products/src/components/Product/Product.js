import {useState, useEffect} from "react";
import axios from 'axios';

const Product = (props) => {
    let product = props.productItem
    let itemAddedToCartEvent = props.itemAddedToCartEvent
    const [cartItems, setCartItems] = useState(undefined);
    const [productInCartProperty, setProductInCartProperty] = useState(undefined)
    const [showFullDescription, setShowFullDescription] = useState(false);

    const changeShowProperty = (truthValue) => {
        setShowFullDescription(truthValue)
    }

    const addProductToCart = async () => {
        const ipAddress = sessionStorage.getItem('clientIp')
        setProductInCartProperty('LOADING')
        axios.post('http://localhost:8090/api/unfinishedOrder', {product: product, client: ipAddress})
            .then(result => {
                let cartItemsCp = result.data.products
                console.log("RR")
                console.log(cartItemsCp)
                setProductInCartProperty(hasItemInUnfinishedOrder(product, cartItemsCp))
                setTimeout(() => setCartItems(cartItemsCp), 10);
                itemAddedToCartEvent();
            })
    }

    const removeItemFromCart = async () => {
        const ipAddress = sessionStorage.getItem('clientIp')
        setProductInCartProperty('LOADING')
        axios.post('http://localhost:8090/api/removeItemUnfinishedOrder', {product: product.productId, client: ipAddress})
            .then(result => {
                let cartItemsCp = result.data.products
                console.log("RR")
                console.log(cartItemsCp)
                setProductInCartProperty(hasItemInUnfinishedOrder(product, cartItemsCp))
                setTimeout(() => setCartItems(cartItemsCp), 10);
                itemAddedToCartEvent();
            })
    }

    const hasItemInUnfinishedOrder = (product, cartItemsValue) => {
        if(cartItemsValue === undefined) {
            return "LOADING"
        }
        let result = "NO"
        cartItemsValue.forEach(cartItem => {
            if(cartItem.productId === product.productId){
                result = "YES"
            }
        })
        return result
    }

    useEffect(() => {
        window.addEventListener("cartItemsUpdated", () => {
            console.log("CART ITEMS UPDATED")
            let cartItemsUpdated = JSON.parse(sessionStorage.getItem("cartItems"))
            setCartItems(cartItemsUpdated)
            setProductInCartProperty(hasItemInUnfinishedOrder(product, cartItemsUpdated))
        })
    },[])


    return (
        <div className="card" >
            <img src={product.imageSource} className="card-img-top img-fluid" alt="..."/>
            <div className="card-body" id={product.productId}>
                <h5 className="card-title">{product.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Price: {product.price}</h6>
                <p className="card-text" style={{fontSize: "1.25rem"}}>
                    {product.description.length > 300 ? (showFullDescription? product.description:`${product.description.substring(0, 299)} ...`) : product.description}
                </p>
                <div className="d-flex justify-content-end">
                    {product.description.length > 300 &&
                        <>
                            {!showFullDescription &&
                            <div>
                                <a href="#" className="btn btn-light"
                                    onClick={(event)=>{event.preventDefault(); changeShowProperty(true)}}
                                >Show Full Description</a>
                            </div>
                            }
                            {showFullDescription &&
                                <div>
                                    <a href="#"
                                       onClick={(event)=>{event.preventDefault(); changeShowProperty(false)}}
                                       className="btn btn-light">Show less</a>
                                </div>
                            }
                        </>
                    }
                    {productInCartProperty === "NO" &&
                        <div style={{marginLeft: "1vw"}}>
                            <a href="#" className="btn btn-outline-success" onClick={(event) => {event.preventDefault();addProductToCart().then()}}>Add To Cart</a>
                        </div>
                    }
                    {productInCartProperty === "YES" &&
                        <div style={{marginLeft: "1vw"}}>
                            <a href="#" className="btn btn-outline-danger" onClick={(event)=>{event.preventDefault(); removeItemFromCart().then()}}>Remove From Cart</a>
                        </div>
                    }
                    {productInCartProperty === "LOADING" &&
                        <div style={{marginLeft: "1vw"}}>
                            <div className="spinner-border text-primary" role="status"/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Product;