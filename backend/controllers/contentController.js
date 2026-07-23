const Content = require("../models/Content");

// =============================================
// Create Content
// POST /api/content
// =============================================

exports.createContent = async (req, res) => {
    try {

        const content = await Content.create(req.body);

        res.status(201).json({
            success: true,
            message: "Content created successfully",
            data: content
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// =============================================
// Get All Content
// GET /api/content
// =============================================

exports.getAllContent = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const search = req.query.search || "";

        const filter = {

            title: {
                $regex: search,
                $options: "i"
            }

        };

        const total = await Content.countDocuments(filter);

        const content = await Content.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({

            success: true,

            total,

            page,

            pages: Math.ceil(total / limit),

            data: content

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =============================================
// Get Single Content
// GET /api/content/:id
// =============================================

exports.getContentById = async (req, res) => {

    try {

        const content = await Content.findById(req.params.id);

        if (!content) {

            return res.status(404).json({

                success: false,

                message: "Content not found"

            });

        }

        res.status(200).json({

            success: true,

            data: content

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =============================================
// Update Content
// PUT /api/content/:id
// =============================================

exports.updateContent = async (req, res) => {

    try {

        const content = await Content.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!content) {

            return res.status(404).json({

                success: false,

                message: "Content not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Content updated successfully",

            data: content

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =============================================
// Delete Content
// DELETE /api/content/:id
// =============================================

exports.deleteContent = async (req, res) => {

    try {

        const content = await Content.findByIdAndDelete(req.params.id);

        if (!content) {

            return res.status(404).json({

                success: false,

                message: "Content not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Content deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};