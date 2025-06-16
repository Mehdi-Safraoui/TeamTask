const Task = require("../models/Task");

// Créer une tâche
exports.createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  const managerId = req.user.userId; // ID du manager connecté (depuis le middleware d'authentification)

  try {
    const newTask = new Task({
      title,
      description,
      assignedTo,
      createdBy: managerId, // Enregistrer qui a créé la tâche
    });

    await newTask.save();
    res.status(201).json({ message: "Tâche créée avec succès", task: newTask });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la création de la tâche" });
  }
};

// Récupérer toutes les tâches de l'utilisateur
exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.userId }); // Ne récupère que les tâches de l'utilisateur connecté
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération des tâches" });
  }
};

// Récupérer toutes les tâches (accessible uniquement aux managers)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Récupère toutes les tâches pour le manager
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la récupération de toutes les tâches",
      });
  }
};

// Mettre à jour une tâche (changement de statut)
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findById(id);

    // Si la tâche n'existe pas ou l'utilisateur ne peut pas la modifier
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    // Si c'est un utilisateur et qu'il essaie de modifier une tâche qui ne lui appartient pas
    if (
      task.assignedTo.toString() !== req.user.userId.toString() &&
      req.user.role !== "manager"
    ) {
      return res
        .status(403)
        .json({
          message: "Accès interdit : Vous ne pouvez pas modifier cette tâche",
        });
    }

    task.status = status || task.status; // Modifier le statut si fourni
    await task.save();

    res.status(200).json({ message: "Tâche mise à jour", task });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la mise à jour de la tâche" });
  }
};

// Supprimer une tâche (accessible uniquement aux managers)
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    // Si ce n'est pas un manager
    if (req.role !== "manager") {
      return res
        .status(403)
        .json({
          message: "Accès interdit : Vous ne pouvez pas supprimer cette tâche",
        });
    }

    await task.remove();

    res.status(200).json({ message: "Tâche supprimée" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la suppression de la tâche" });
  }
};
