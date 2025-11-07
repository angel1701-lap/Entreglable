// src/pages/DashboardAdmin.jsx
import React, { useState, useEffect } from 'react';
import TramiteList from '../components/TramiteList';
import { getAllTramites } from '../services/api';

export default function DashboardAdmin() {
  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTramites = async () => {
      try {
        const data = await getAllTramites();
        setTramites(data);
      } catch (err) {
        console.error("Error al cargar trámites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTramites();
  }, []);

  return (
    <div className="py-6 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Municipal – Gestión de Trámites</h1>

      {loading ? (
        <p className="text-center text-gray-600">Cargando trámites...</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Lista de Trámites Recientes</h2>
            <span className="text-sm text-gray-500">
              Total: {tramites.length} trámites
            </span>
          </div>
          <TramiteList tramites={tramites} />
        </div>
      )}
    </div>
  );
}