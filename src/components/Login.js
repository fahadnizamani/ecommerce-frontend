import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async () => {
        try {
            console.log("Attempting login with:", { email, password });
            const res = await API.post("/auth/login", { email, password });

            console.log("LOGIN RESPONSE:", res.data);
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);


            alert("Login successful");
            navigate("/products");
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Login failed";
            console.error("Login error:", err.response?.data);
            console.error("Status:", err.response?.status);
            console.error("Full error:", err);

            setError(errorMsg);
            alert("Login failed: " + errorMsg);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input placeholder="Email"
                   onChange={(e) => setEmail(e.target.value)} />

            <input type="password"
                   placeholder="Password"
                   onChange={(e) => setPassword(e.target.value)} />

            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;