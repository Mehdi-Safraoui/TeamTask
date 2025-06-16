// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// GET /api/users - accessible uniquement aux managers
router.get("/", authMiddleware, roleMiddleware(["manager"]), getAllUsers);

module.exports = router;