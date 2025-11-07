// src/components/TramiteList.jsx
import React from 'react';

export default function TramiteList({ tramites = [] }) {
  if (tramites.length === 0) {
    return <p className="text-gray-500 text-center py-4">No hay trámites registrados.</p>;
  }

  const getPriorityClass = (p) => {
    switch (p) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Tipo</th>
            <th className="py-2 px-4 border">Prioridad</th>
            <th className="py-2 px-4 border">Estado</th>
            <th className="py-2 px-4 border">Correo</th>
            <th className="py-2 px-4 border">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {tramites.map((t) => (
            <tr key={t.tramite_id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border text-center">{t.tramite_id}</td>
              <td className="py-2 px-4 border">{t.tipo_solicitud}</td>
              <td className="py-2 px-4 border text-center">
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(t.prioridad)}`}>
                  {t.prioridad}
                </span>
              </td>
              <td className="py-2 px-4 border">{t.status}</td>
              <td className="py-2 px-4 border">{t.email_ciudadano}</td>
              <td className="py-2 px-4 border">
                {t.timestamp ? new Date(t.timestamp).toLocaleDateString('es-PE') : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}