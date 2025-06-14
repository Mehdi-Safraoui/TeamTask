const isRole = (roles) => {
  return (req, res, next) => {
    // Vérifie si l'utilisateur a un rôle valide
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: 'Accès interdit, rôle non autorisé' });
    }
  };
};

module.exports = isRole;