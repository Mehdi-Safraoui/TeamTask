const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Vérifie si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email déjà utilisé" });

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await newUser.save();

    res.status(201).json({ message: "Inscription réussie" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trouve l'utilisateur
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    // Créer le token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Retourne les infos nécessaires
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
