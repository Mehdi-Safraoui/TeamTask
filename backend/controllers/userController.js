// controllers/userController.js
const User = require("../models/User");

// Exclut les managers de la liste
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }, "_id email username role");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = { getAllUsers };