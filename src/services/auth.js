import { jwtDecode } from "jwt-decode";

export const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);


        // 🔍 Adjust based on your JWT payload
        // common fields: sub, userId, id, email
        return decoded.userId || decoded.id || decoded.sub;
    } catch (e) {
        console.error("Invalid token");
        return null;
    }
};