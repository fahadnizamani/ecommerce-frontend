import React, { useEffect, useState } from "react";
import API from "../services/api";
import { getUserId } from "../services/auth";


function Cart() {
    const [cart, setCart] = useState(null);

    //const userId = getUserId();
    //const userId = 1;

    useEffect(() => {
        API.get("/api/cart")
            .then((res) => setCart(res.data));
    }, []);

    const placeOrder = async () => {
        await API.post("/api/orders");
        alert("Order placed!");
    };

    return (
        <div>
            <h2>Cart</h2>

            {cart?.items?.map((item, i) => (
                <div key={i}>
                    Product: {item.productId} | Qty: {item.quantity}
                </div>
            ))}

            <button onClick={placeOrder}>
                Place Order
            </button>
        </div>
    );
}

export default Cart;