import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function DashboardUser() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const userName = user?.username || user?.email || "Utilisateur";

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des tâches", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut", err);
    }
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
        <h2>📋 Tableau de Bord de {userName}</h2>
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

      <div style={{ margin: "1rem 0" }}>
        <label>Filtrer par statut : </label>
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="">-- Toutes --</option>
          <option value="à faire">À faire</option>
          <option value="en cours">En cours</option>
          <option value="terminée">Terminée</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p>Aucune tâche trouvée.</p>
      ) : (
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
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{task.title}</td>
                <td style={tdStyle}>{task.description}</td>
                <td style={tdStyle}>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                    style={{ ...inputStyle, width: "100%" }}
                  >
                    <option value="à faire">À faire</option>
                    <option value="en cours">En cours</option>
                    <option value="terminée">Terminée</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export default DashboardUser;
