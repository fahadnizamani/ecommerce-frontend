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
        <div className="login-page">
            <div className="login-card">
                <div className="login-brand">
                    <span className="brand-badge">E</span>
                    <h1>ShopEase</h1>
                </div>

                <h2>Welcome back</h2>
                <p className="login-subtitle">Sign in to continue to your account</p>

                <div className="login-form">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <div className="error-box">{error}</div>}

                    <button onClick={login} className="login-button">Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;