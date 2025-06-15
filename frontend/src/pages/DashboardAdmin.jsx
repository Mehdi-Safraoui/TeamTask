import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function DashboardAdmin() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const { token } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchTasks();
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };

  const filteredTasks = statusFilter
    ? tasks.filter((task) => task.status === statusFilter)
    : tasks;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 600, margin: "auto" }}>
        <h2>Tableau de Bord Administrateur</h2>
        <h2>Les Tâches</h2>

        <label>Filtrer par statut : </label>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">-- Toutes --</option>
          <option value="à faire">À faire</option>
          <option value="en cours">En cours</option>
          <option value="terminée">Terminée</option>
        </select>

        <ul>
          {filteredTasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> — {task.status}
              <br />
              {task.description}
            </li>
          ))}
        </ul>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default DashboardAdmin;
