import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 🔹 Function to create a JWT token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// ✅ **Signup Controller**
export const signupUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Signup request received:", email, password); // 🔹 Debugging log

    try {
        const user = await User.signup(email, password);
        console.log("User created:", user); // 🔹 Check if user is created

        const token = createToken(user._id);
        res.status(201).json({ email, token });
    } catch (err) {
        console.error("Signup error:", err.message); // 🔹 Log error details
        res.status(400).json({ error: err.message });
    }
};

// ✅ **Login Controller**
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request received:", email, password); // 🔹 Debugging log

    try {
        const user = await User.login(email, password);
        console.log("User logged in:", user); // 🔹 Check if user exists

        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (err) {
        console.error("Login error:", err.message); // 🔹 Log error details
        res.status(400).json({ error: err.message });
    }
};
