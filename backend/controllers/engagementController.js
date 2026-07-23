const EngagementScore = require("../models/EngagementScore");

// ==============================
// CREATE Engagement Score
// ==============================
exports.createEngagementScore = async (req, res) => {
    try {

        const engagement = await EngagementScore.create({
            ...req.body,
            calculated_on: new Date()
        });

        res.status(201).json({
            success: true,
            message: "Engagement Score created successfully",
            data: engagement
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==============================
// GET ALL Engagement Scores
// ==============================
exports.getAllEngagementScores = async (req, res) => {

    try {

        const engagementScores = await EngagementScore
            .find()
            .populate("content_id");

        res.status(200).json({
            success: true,
            count: engagementScores.length,
            data: engagementScores
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==============================
// GET Engagement Score BY ID
// ==============================
exports.getEngagementScoreById = async (req, res) => {

    try {

        const engagement = await EngagementScore
            .findById(req.params.id)
            .populate("content_id");

        if (!engagement) {

            return res.status(404).json({
                success: false,
                message: "Engagement Score not found"
            });

        }

        res.status(200).json({
            success: true,
            data: engagement
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==============================
// UPDATE Engagement Score
// ==============================
exports.updateEngagementScore = async (req, res) => {

    try {

        const engagement = await EngagementScore.findByIdAndUpdate(

            req.params.id,

            {
                ...req.body,
                calculated_on: new Date()
            },

            {
                new: true,
                runValidators: true
            }

        );

        if (!engagement) {

            return res.status(404).json({
                success: false,
                message: "Engagement Score not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Engagement Score updated successfully",
            data: engagement
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==============================
// DELETE Engagement Score
// ==============================
exports.deleteEngagementScore = async (req, res) => {

    try {

        const engagement = await EngagementScore.findByIdAndDelete(req.params.id);

        if (!engagement) {

            return res.status(404).json({
                success: false,
                message: "Engagement Score not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Engagement Score deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};