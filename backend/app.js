const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to StreamSense API"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

module.exports = app;