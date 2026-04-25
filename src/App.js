import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/" && <Navbar />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/products" element={
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                } />
                <Route path="/cart" element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;