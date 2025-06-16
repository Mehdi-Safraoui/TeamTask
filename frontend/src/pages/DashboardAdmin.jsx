import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function DashboardAdmin() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des tâches", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };

  const filteredTasks = statusFilter
    ? tasks.filter((task) => task.status === statusFilter)
    : tasks;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>📋 Tableau de Bord - Admin</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            background: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Déconnexion
        </button>
      </div>

      {/* Filtre */}
      <div style={{ margin: "1rem 0" }}>
        <label>Filtrer par statut : </label>
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="">-- Toutes --</option>
          <option value="à faire">À faire</option>
          <option value="en cours">En cours</option>``
          <option value="terminée">Terminée</option>
        </select>
      </div>

      {/* Tableau des tâches */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "2rem",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={thStyle}>Titre</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Statut</th>
            <th style={thStyle}>Assigné à</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => {
            const assignedUser = users.find((u) => u._id === task.assignedTo);
            return (
              <tr key={task._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{task.title}</td>
                <td style={tdStyle}>{task.description}</td>
                <td style={tdStyle}>{task.status}</td>
                <td style={tdStyle}>
                  {assignedUser?.name || assignedUser?.email || "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Liste des utilisateurs */}
      <div
        style={{
          background: "#fff",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          marginBottom: "2rem",
        }}
      >
        <h3>👥 Liste des utilisateurs</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f2f5" }}>
              <th style={thStyle}>Nom d'utilisateur</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Rôle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{user.username || "—"}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulaire de création */}
      <div
        style={{
          background: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>➕ Créer une nouvelle tâche</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await axios.post(
                "http://localhost:5000/api/tasks",
                {
                  title,
                  description,
                  assignedTo,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              alert("✅ Tâche créée avec succès !");
              fetchTasks();
              setTitle("");
              setDescription("");
              setAssignedTo("");
            } catch (err) {
              console.error("Erreur lors de la création de la tâche", err);
              alert("Erreur lors de la création");
            }
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label>Titre : </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Description : </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Assigner à :</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
              style={{ ...inputStyle, width: "100%" }}
            >
              <option value="">-- Sélectionner un utilisateur --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              background: "#1890ff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Créer la tâche
          </button>
        </form>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "10px",
  borderBottom: "2px solid #ccc",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  verticalAlign: "top",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export default DashboardAdmin;
