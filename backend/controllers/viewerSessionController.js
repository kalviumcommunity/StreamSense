const ViewerSession = require("../models/ViewerSession");

// Create Session
exports.createSession = async (req, res) => {
  try {
    const session = await ViewerSession.create(req.body);

    res.status(201).json({
      success: true,
      message: "Viewer session created successfully",
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Sessions
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await ViewerSession.find()
      .populate("viewer", "name email")
      .populate("content", "title genre");

    res.json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Session By ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await ViewerSession.findById(req.params.id)
      .populate("viewer")
      .populate("content");

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Session
exports.updateSession = async (req, res) => {
  try {
    const session = await ViewerSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.json({
      success: true,
      message: "Session updated successfully",
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Session
exports.deleteSession = async (req, res) => {
  try {
    const session = await ViewerSession.findByIdAndDelete(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};