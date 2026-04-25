import React, { useEffect, useState } from "react";
import API from "../services/api";
import { getUserId } from "../services/auth";


function Products() {
    const [products, setProducts] = useState([]);

    //const userId = 1;
    //const userId = getUserId();

    useEffect(() => {
        API.get("/api/products")
            .then((res) => setProducts(res.data));
    }, []);

    const addToCart = async (id) => {
        await API.post("/api/cart", {
            productId: id,
            quantity: 1,
        });

        alert("Added to cart");
    };

    return (
        <div>
            <h2>Products</h2>

            {products.map((p) => (
                <div key={p.id}>
                    <h4>{p.name}</h4>
                    <p>${p.price}</p>

                    <button onClick={() => addToCart(p.id)}>
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Products;