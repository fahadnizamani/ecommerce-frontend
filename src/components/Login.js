import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const res = await API.post("/auth/login", { email, password });

            console.log("LOGIN RESPONSE:", res.data);
            localStorage.setItem("token", res.data.accessToken);


            alert("Login successful");
            navigate("/products");
        } catch (err) {
            alert("Login failed");
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