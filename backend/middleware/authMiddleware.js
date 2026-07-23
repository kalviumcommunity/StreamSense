const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

        console.log("Authorization Header:", req.headers.authorization);

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {

            token = req.headers.authorization.split(" ")[1];

            console.log("Token:", token);
            console.log("JWT Secret:", process.env.JWT_SECRET);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log("Decoded:", decoded);

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found"
                });
            }

            next();

        } else {

            return res.status(401).json({
                success: false,
                message: "No token provided"
            });

        }

    } catch (err) {

        console.error(err);

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }
};

module.exports = protect;