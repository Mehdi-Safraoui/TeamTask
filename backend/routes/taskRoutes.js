const express = require('express');
const router = express.Router();
const { createTask, getUserTasks, getAllTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Créer une tâche (Accessible uniquement par les managers)
router.post('/', authMiddleware, roleMiddleware(['manager']), createTask);

// Récupérer toutes les tâches de l'utilisateur (Accessible par l'utilisateur authentifié uniquement)
router.get('/', authMiddleware, getUserTasks);

// Récupérer toutes les tâches (Accessible uniquement par les managers)
router.get('/all', authMiddleware, roleMiddleware(['manager']), getAllTasks);

// Mettre à jour une tâche (Accessible uniquement par l'utilisateur qui a créé la tâche ou les managers)
router.put('/:id', authMiddleware, updateTask);

// Supprimer une tâche (Accessible uniquement par les managers)
router.delete('/:id', authMiddleware, roleMiddleware(['manager']), deleteTask);

module.exports = router;