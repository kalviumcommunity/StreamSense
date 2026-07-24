const RetentionAnalytics = require("../models/RetentionAnalytics");

// Create
exports.createRetention = async (req, res) => {
    try {

        const retention = await RetentionAnalytics.create(req.body);

        res.status(201).json({
            success: true,
            message: "Retention Analytics Created",
            data: retention
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All
exports.getAllRetention = async (req, res) => {

    try {

        const retention = await RetentionAnalytics
            .find()
            .populate("content_id");

        res.json({
            success: true,
            count: retention.length,
            data: retention
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get One
exports.getRetentionById = async (req, res) => {

    try {

        const retention = await RetentionAnalytics
            .findById(req.params.id)
            .populate("content_id");

        if (!retention) {

            return res.status(404).json({
                success: false,
                message: "Retention Analytics Not Found"
            });

        }

        res.json({
            success: true,
            data: retention
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update
exports.updateRetention = async (req, res) => {

    try {

        const retention = await RetentionAnalytics.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!retention) {

            return res.status(404).json({
                success: false,
                message: "Retention Analytics Not Found"
            });

        }

        res.json({
            success: true,
            message: "Retention Updated Successfully",
            data: retention
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete
exports.deleteRetention = async (req, res) => {

    try {

        const retention = await RetentionAnalytics.findByIdAndDelete(req.params.id);

        if (!retention) {

            return res.status(404).json({
                success: false,
                message: "Retention Analytics Not Found"
            });

        }

        res.json({
            success: true,
            message: "Retention Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};