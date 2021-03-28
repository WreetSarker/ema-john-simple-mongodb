import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://guarded-meadow-24576.herokuapp.com/product/' + productKey)
            .then(resp => resp.json())
            .then(data => setProduct(data))
    }, [productKey])

    console.log(product);
    return (
        <div>
            <h1>Your product details: </h1>
            <Product showCartBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;