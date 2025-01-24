const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided. Authorization denied." });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after 'Bearer'

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = verifyToken;
