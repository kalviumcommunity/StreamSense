const express = require("express");

const router = express.Router();

const {

createRetention,
getAllRetention,
getRetentionById,
updateRetention,
deleteRetention

} = require("../controllers/retentionController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Create
router.post(
"/",
protect,
authorize("Admin"),
createRetention
);

// Get All
router.get(
"/",
protect,
authorize("Admin","Analyst"),
getAllRetention
);

// Get One
router.get(
"/:id",
protect,
authorize("Admin","Analyst"),
getRetentionById
);

// Update
router.put(
"/:id",
protect,
authorize("Admin"),
updateRetention
);

// Delete
router.delete(
"/:id",
protect,
authorize("Admin"),
deleteRetention
);

module.exports = router;