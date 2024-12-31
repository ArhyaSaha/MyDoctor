import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import User from "../models/userModel.js"; // Assume a User model exists

const router = express.Router();

router.post("/login", (req, res) => {
    const { email, role } = req.body;

    // Mocked user details
    if (!email || !role) {
        return res.status(400).json({ message: "Email and role are required" });
    }

    const mockUser = {
        id: "mockUserId123",
        email,
        role, // e.g., "doctor" or "patient"
    };

    // Generate a JWT with the mock user data
    const token = jwt.sign(mockUser, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token valid for 1 hour
    });

    res.status(200).json({
        message: "Mock login successful",
        token,
    });
});

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(401).json({ message: "Invalid credentials" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//         const token = jwt.sign(
//             { id: user._id, role: user.role }, // Payload
//             process.env.JWT_SECRET,          // Secret key
//             { expiresIn: process.env.JWT_EXPIRATION } // Expiration
//         );

//         res.status(200).json({ message: "Login successful", token });
//     } catch (error) {
//         res.status(500).json({ message: "Error logging in", error: error.message });
//     }
// });

export default router;
