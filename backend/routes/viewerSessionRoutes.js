const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
} = require("../controllers/viewerSessionController");

router.post("/", protect, authorize("Admin", "Analyst"), createSession);

router.get("/", protect, authorize("Admin", "Analyst"), getAllSessions);

router.get("/:id", protect, authorize("Admin", "Analyst"), getSessionById);

router.put("/:id", protect, authorize("Admin", "Analyst"), updateSession);

router.delete("/:id", protect, authorize("Admin"), deleteSession);

module.exports = router;