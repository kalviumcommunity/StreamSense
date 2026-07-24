const express = require("express");

const router = express.Router();

const {

createRecommendation,
getAllRecommendations,
getRecommendationById,
updateRecommendation,
deleteRecommendation

} = require("../controllers/recommendationController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Create
router.post(
    "/",
    protect,
    authorize("Admin"),
    createRecommendation
);

// Get All
router.get(
    "/",
    protect,
    authorize("Admin", "Analyst"),
    getAllRecommendations
);

// Get One
router.get(
    "/:id",
    protect,
    authorize("Admin", "Analyst"),
    getRecommendationById
);

// Update
router.put(
    "/:id",
    protect,
    authorize("Admin"),
    updateRecommendation
);

// Delete
router.delete(
    "/:id",
    protect,
    authorize("Admin"),
    deleteRecommendation
);

module.exports = router;