// src/components/TramiteStatus.jsx
import { useState } from 'react';
import { getTramiteStatus } from '../services/api';

export default function TramiteStatus() {
  const [id, setId] = useState('');
  const [tramite, setTramite] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTramite(null);

    try {
      const data = await getTramiteStatus(id);
      if (data.error) throw new Error(data.error);
      setTramite(data);
    } catch (err) {
      setError('Trámite no encontrado o error en el sistema.');
    }
  };

  const priorityBadge = (p) => {
    const classes = {
      alta: 'bg-red-100 text-red-800',
      media: 'bg-yellow-100 text-yellow-800',
      baja: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${classes[p] || classes.baja}`}>
        {p}
      </span>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Consultar trámite</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value.toUpperCase())}
          placeholder="Ej: A3F9B2"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Consultar
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {tramite && (
        <div className="border-t pt-4 mt-4">
          <p><strong>ID:</strong> {tramite.tramite_id}</p>
          <p><strong>Estado:</strong> {tramite.status}</p>
          <p><strong>Prioridad:</strong> {priorityBadge(tramite.prioridad)}</p>
          <p><strong>Tipo:</strong> {tramite.tipo_solicitud}</p>
          {tramite.timestamp && (
            <p><strong>Registrado:</strong> {new Date(tramite.timestamp).toLocaleString('es-PE')}</p>
          )}
        </div>
      )}
    </div>
  );
}