import jwt from "jsonwebtoken";

// Middleware to authenticate JWT
export const authenticateJWT = (req, res, next) => {
    // const token = req.headers.authorization?.split(" ")[1]; // Extract the token

    // if (!token) {
    //     return res.status(401).json({ message: "Unauthorized: No token provided" });
    // }
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};

// Middleware for role-based access
export const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: `Forbidden: Access restricted to ${role}` });
    }
    next();
};
