// src/pages/ConsultarTramite.jsx
import { useState } from "react";
import { getTramiteStatus } from "../services/api";

export default function ConsultarTramite() {
  const [id, setId] = useState("");
  const [tramite, setTramite] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setTramite(null);
    setLoading(true);

    try {
      const data = await getTramiteStatus(id);
      setTramite(data);
    } catch (err) {
      setError("Trámite no encontrado. Verifique el ID e intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completado': return 'text-green-700 bg-green-50';
      case 'en_proceso': return 'text-blue-700 bg-blue-50';
      case 'pendiente': return 'text-yellow-700 bg-yellow-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completado': return 'Completado';
      case 'en_proceso': return 'En Proceso';
      case 'pendiente': return 'Pendiente';
      default: return status;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Consultar Estado de Trámite</h1>
        <p className="text-sm text-gray-600">Ingrese su ID de trámite para conocer el estado actual</p>
      </div>

      {/* Formulario de búsqueda */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Buscar trámite</h2>
        </div>
        
        <form onSubmit={handleSearch} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID de Trámite
            </label>
            <input
              type="text"
              placeholder="Ej: 12345"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              El ID fue enviado a su correo al momento de registrar el trámite
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 px-4 rounded-sm text-sm font-medium transition-colors ${
              loading 
                ? 'bg-gray-400 text-gray-100 cursor-not-allowed' 
                : 'bg-gray-800 text-white hover:bg-gray-900'
            }`}
          >
            {loading ? 'Buscando...' : 'Buscar trámite'}
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-sm p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Resultado */}
      {tramite && (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">Información del Trámite</h3>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">ID de Trámite:</span>
              <span className="font-mono text-sm text-gray-900 font-semibold">{tramite.tramite_id}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Estado:</span>
              <span className={`px-3 py-1 rounded-sm text-xs font-medium ${getStatusColor(tramite.status)}`}>
                {getStatusText(tramite.status)}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Tipo de Trámite:</span>
              <span className="text-sm text-gray-900">{tramite.tipo_solicitud}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Prioridad:</span>
              <span className={`text-sm font-medium ${
                tramite.prioridad === 'alta' ? 'text-red-700' : 
                tramite.prioridad === 'media' ? 'text-yellow-700' : 
                'text-green-700'
              }`}>
                {tramite.prioridad.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-sm font-medium text-gray-600">Última Actualización:</span>
              <span className="text-sm text-gray-900">
                {new Date(tramite.timestamp).toLocaleString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>

          {/* Información adicional */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-gray-600">
                Recibirá notificaciones por correo electrónico cuando el estado de su trámite cambie.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}