import React, { useState, useEffect } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    // const firstTen = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://guarded-meadow-24576.herokuapp.com/products?search=' + search)
            .then(resp => resp.json())
            .then(data => setProducts(data))
    }, [search])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://guarded-meadow-24576.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(resp => resp.json())
            .then(data => setCart(data))
    }, [])

    const handleSearch = event => {
        setSearch(event.target.value)
    }

    const handleAddProduct = (product) => {
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                <input type="text" onBlur={handleSearch} placeholder="Search Your Desired Product" className="product-search" />
                {
                    products.map(product => <Product key={product.key} showCartBtn={true} handleAddProduct={handleAddProduct} product={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="main-button">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;