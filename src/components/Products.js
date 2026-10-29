import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const defaultProductImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80";

function Products() {
    const [products, setProducts] = useState([]);

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
        <div className="page-shell">
            <div className="content-container">
                <div className="section-header">
                    <div>
                        <p className="eyebrow">Shop</p>
                        <h2>Featured Products</h2>
                    </div>
                </div>

                <div className="product-grid">
                    {products.map((p) => (
                        <div className="product-card" key={p.id}>
                            <div className="product-image">
                                <img
                                    src={p.image || defaultProductImage}
                                    alt={p.name}
                                    onError={(e) => {
                                        e.target.src = defaultProductImage;
                                    }}
                                />
                            </div>
                            <div className="product-body">
                                <h3>{p.name}</h3>
                                <p className="product-description">{p.description || "Premium quality product from our collection."}</p>
                                <div className="product-footer">
                                    <span className="price">${Number(p.price).toFixed(2)}</span>
                                </div>
                                <div className="product-actions">
                                    <button className="primary-btn" onClick={() => addToCart(p.id)}>
                                        Add to Cart
                                    </button>
                                    <Link to={`/products/${p.id}`} state={{ product: p }} className="text-link">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;