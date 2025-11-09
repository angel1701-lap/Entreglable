// src/pages/DashboardAdmin.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TramiteList from '../components/TramiteList';
import { getAllTramites } from '../services/api';

export default function DashboardAdmin() {
  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  // Calcular estadísticas
  const stats = {
    total: tramites.length,
    pendientes: tramites.filter(t => t.status === 'pendiente').length,
    enProceso: tramites.filter(t => t.status === 'en_proceso').length,
    completados: tramites.filter(t => t.status === 'completado').length,
    prioridadAlta: tramites.filter(t => t.prioridad === 'alta').length,
  };

  return (
    <div className="space-y-6">
      {/* Header del Dashboard */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Panel de Administración</h1>
            <p className="text-sm text-gray-600 mt-1">Gestión de trámites municipales</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Bienvenido,</p>
            <p className="text-base font-medium text-gray-800">{user?.username}</p>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Total</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">{stats.total}</p>
              </div>
              <div className="bg-gray-100 rounded-full p-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Pendientes</p>
                <p className="text-2xl font-semibold text-yellow-600 mt-1">{stats.pendientes}</p>
              </div>
              <div className="bg-yellow-50 rounded-full p-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">En Proceso</p>
                <p className="text-2xl font-semibold text-blue-600 mt-1">{stats.enProceso}</p>
              </div>
              <div className="bg-blue-50 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Completados</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">{stats.completados}</p>
              </div>
              <div className="bg-green-50 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase">Prioridad Alta</p>
                <p className="text-2xl font-semibold text-red-600 mt-1">{stats.prioridadAlta}</p>
              </div>
              <div className="bg-red-50 rounded-full p-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Trámites */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Trámites Recientes</h2>
            {!loading && (
              <span className="text-sm text-gray-600">
                {tramites.length} {tramites.length === 1 ? 'trámite' : 'trámites'}
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
              <p className="text-gray-600 mt-4">Cargando trámites...</p>
            </div>
          ) : tramites.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 mt-4">No hay trámites registrados</p>
            </div>
          ) : (
            <TramiteList tramites={tramites} />
          )}
        </div>
      </div>
    </div>
  );
}