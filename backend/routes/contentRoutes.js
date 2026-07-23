const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {

    createContent,

    getAllContent,

    getContentById,

    updateContent,

    deleteContent

} = require("../controllers/contentController");

router.post(

    "/",

    protect,

    authorize("Admin"),

    createContent

);

router.get(

    "/",

    protect,

    authorize("Admin", "Analyst"),

    getAllContent

);

router.get(

    "/:id",

    protect,

    authorize("Admin", "Analyst"),

    getContentById

);

router.put(

    "/:id",

    protect,

    authorize("Admin"),

    updateContent

);

router.delete(

    "/:id",

    protect,

    authorize("Admin"),

    deleteContent

);

module.exports = router;