import React, { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
    const [cart, setCart] = useState(null);

    const refreshCart = async () => {
        try {
            const res = await API.get("/api/cart");
            setCart(res.data);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    const placeOrder = async () => {
        try {
            if (!cart?.items || cart.items.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            const payload = {
                items: cart.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                })),
            };

            await API.post("/api/orders", payload);
            await API.delete("/api/cart");
            await refreshCart();
            alert("Order placed!");
        } catch (err) {
            console.error("Place order failed:", err.response?.data || err);
            alert(err.response?.data?.message || err.message || "Failed to place order");
        }
    };

    return (
        <div className="page-shell">
            <div className="content-container cart-container">
                <div className="section-header cart-header">
                    <div>
                        <p className="eyebrow">Your bag</p>
                        <h2>Shopping Cart</h2>
                    </div>
                    <span className="cart-count">{cart?.items?.length || 0} items</span>
                </div>

                {cart?.items?.length ? (
                    <div className="cart-box">
                        {cart.items.map((item, i) => (
                            <div className="cart-item" key={i}>
                                <div className="cart-item-left">
                                    <div className="cart-item-icon">#{item.productId}</div>
                                    <div>
                                        <h3>Product {item.productId}</h3>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="cart-item-right">
                                    <span>Qty {item.quantity}</span>
                                </div>
                            </div>
                        ))}

                        <div className="cart-summary">
                            <div>
                                <span>Total Items</span>
                                <strong>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
                            </div>
                            <button className="primary-btn" onClick={placeOrder}>
                                Place Order
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart">
                        <h3>Your cart is empty</h3>
                        <p>Add products from the catalog to continue.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;