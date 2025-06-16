const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB (à remplacer par ton URL MongoDB Atlas ou local)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch(err => console.log(err));

// Routes test
app.get("/", (req, res) => {
  res.send("API TeamTask OK !");
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;

// Importer les routes d'authentification
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Importer les routes des tâches
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));