🚀 TeamTask – Application MERN de gestion des tâches
TeamTask est une application de gestion de tâches collaborative développée avec la stack MERN (MongoDB, Express.js, React, Node.js) et Redux Toolkit. Elle permet aux managers d’assigner des tâches et aux utilisateurs de les suivre, dans un environnement sécurisé avec authentification JWT.

📌 Fonctionnalités principales
🔐 Authentification (JWT)
Inscription et connexion sécurisées

Stockage du token dans le localStorage

Middleware d’authentification (backend) pour protéger les routes

Accès restreint selon les rôles :

User : peut voir et modifier ses tâches

Manager : peut créer, assigner et consulter toutes les tâches

✅ Gestion des tâches (CRUD)
Création, lecture et mise à jour de tâches

Chaque tâche contient :

title (obligatoire)

description (optionnelle)

status : à faire, en cours, terminée

assignedTo : utilisateur concerné

🧑‍💼 Gestion des utilisateurs (Page Admin)
Liste de tous les utilisateurs visible par le manager

Affichage du nom/email/rôle

Utilisée pour l’assignation des tâches

📋 Tableau de bord
Filtrage des tâches par statut

Vue dynamique des tâches

Affichage du nom ou de l’email du collaborateur assigné

🛠️ Technologies utilisées
Backend :
Node.js
Express.js
MongoDB + Mongoose
JSON Web Token (JWT)

Frontend :
React
Redux Toolkit
Axios

📁 Structure du projet

TeamTask/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── server.js
├── frontend/
│   ├── features/
│   │   ├── auth/
│   │   └── tasks/
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   └── DashboardAdmin.js
│   ├── App.js
│   └── index.js

🧪 Lancement du projet
1. Backend :
cd backend
npm install
npm run start

2. Frontend
bash
Copier
Modifier
cd frontend
npm install
npm run dev 

📝 Utilisation
S’inscrire ( rôle par defaut user) + creer manager(admin) via postman

Se connecter et accéder au tableau de bord

En tant que manager, créer et assigner des tâches aux autres utilisateurs

En tant que user, consulter ses tâches et mettre à jour leur statut

🎥 Démo

 Captures d'écran annotées dans un fichier word


🤝 Contributeur
Mehdi Safraoui
