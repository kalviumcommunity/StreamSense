const express = require("express");

const router = express.Router();

const {

    createEngagementScore,
    getAllEngagementScores,
    getEngagementScoreById,
    updateEngagementScore,
    deleteEngagementScore

} = require("../controllers/engagementController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Create
router.post(
    "/",
    protect,
    authorize("Admin"),
    createEngagementScore
);

// Get All
router.get(
    "/",
    protect,
    authorize("Admin", "Analyst"),
    getAllEngagementScores
);

// Get By ID
router.get(
    "/:id",
    protect,
    authorize("Admin", "Analyst"),
    getEngagementScoreById
);

// Update
router.put(
    "/:id",
    protect,
    authorize("Admin"),
    updateEngagementScore
);

// Delete
router.delete(
    "/:id",
    protect,
    authorize("Admin"),
    deleteEngagementScore
);

module.exports = router;