import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div style={{ padding: "10px", background: "#eee" }}>
            <Link to="/products" style={{ marginRight: "10px" }}>
                Products
            </Link>

            <Link to="/cart" style={{ marginRight: "10px" }}>
                Cart
            </Link>

            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Navbar;