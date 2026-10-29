import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import API from "../services/api";

const defaultProductImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80";

function ProductDetails() {
    const { id } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(location.state?.product || null);

    useEffect(() => {
        if (!product && id) {
            API.get(`/api/products/${id}`)
                .then((res) => setProduct(res.data))
                .catch((err) => {
                    console.error("Failed to load product details:", err);
                });
        }
    }, [id, product]);

    const addToCart = async () => {
        if (!product) return;

        await API.post("/api/cart", {
            productId: product.id,
            quantity: 1,
        });

        alert("Added to cart");
    };

    if (!product) {
        return (
            <div className="page-shell">
                <div className="content-container">
                    <div className="empty-cart">
                        <h3>Product not found</h3>
                        <p>Please go back to the product list and try again.</p>
                        <Link to="/products" className="details-link">Back to products</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-shell">
            <div className="content-container">
                <div className="details-header">
                    <Link to="/products" className="details-link">← Back to Products</Link>
                </div>

                <div className="product-details-card">
                    <div className="product-details-image-wrap">
                        <img
                            src={product.image || defaultProductImage}
                            alt={product.name}
                            className="product-details-image"
                            onError={(e) => {
                                e.target.src = defaultProductImage;
                            }}
                        />
                    </div>

                    <div className="product-details-body">
                        <p className="eyebrow">Product Details</p>
                        <h2>{product.name}</h2>
                        <div className="detail-price">${Number(product.price).toFixed(2)}</div>

                        <p className="detail-description">
                            {product.description || "A premium product from our catalog, carefully selected for quality and value."}
                        </p>

                        <div className="detail-meta">
                            <span>In stock: {product.quantity ?? 0}</span>
                        </div>

                        <div className="detail-actions">
                            <button className="primary-btn" onClick={addToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;

