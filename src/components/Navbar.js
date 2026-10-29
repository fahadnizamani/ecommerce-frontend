import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="top-nav">
            <div className="nav-inner">
                <div className="nav-brand">
                    <span className="nav-badge">E</span>
                    <Link to="/products">ShopEase</Link>
                </div>

                <div className="nav-links">
                    <Link to="/products">Products</Link>
                    <Link to="/cart" className="cart-link">
                        Cart
                        <span className="cart-badge">0</span>
                    </Link>
                </div>

                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;