const Recommendation = require("../models/Recommendation");

// Create Recommendation
exports.createRecommendation = async (req, res) => {

    try {

        const recommendation = await Recommendation.create(req.body);

        res.status(201).json({
            success: true,
            message: "Recommendation Created Successfully",
            data: recommendation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Recommendations
exports.getAllRecommendations = async (req, res) => {

    try {

        const recommendations = await Recommendation
            .find()
            .populate("content_id");

        res.json({
            success: true,
            count: recommendations.length,
            data: recommendations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Recommendation By ID
exports.getRecommendationById = async (req, res) => {

    try {

        const recommendation = await Recommendation
            .findById(req.params.id)
            .populate("content_id");

        if (!recommendation) {

            return res.status(404).json({
                success: false,
                message: "Recommendation Not Found"
            });

        }

        res.json({
            success: true,
            data: recommendation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Recommendation
exports.updateRecommendation = async (req, res) => {

    try {

        const recommendation = await Recommendation.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!recommendation) {

            return res.status(404).json({
                success: false,
                message: "Recommendation Not Found"
            });

        }

        res.json({
            success: true,
            message: "Recommendation Updated Successfully",
            data: recommendation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Recommendation
exports.deleteRecommendation = async (req, res) => {

    try {

        const recommendation = await Recommendation.findByIdAndDelete(req.params.id);

        if (!recommendation) {

            return res.status(404).json({
                success: false,
                message: "Recommendation Not Found"
            });

        }

        res.json({
            success: true,
            message: "Recommendation Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};