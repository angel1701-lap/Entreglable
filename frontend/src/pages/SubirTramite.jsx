// src/pages/SubirTramite.jsx
import React, { useState } from 'react';
import TramiteForm from '../components/TramiteForm';
import NotificationBanner from '../components/NotificationBanner';

export default function SubirTramite() {
  const [submittedResult, setSubmittedResult] = useState(null);

  const handleSubmitted = (result) => {
    setSubmittedResult(result);
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Subir Nuevo Trámite o CV</h1>

      {!submittedResult ? (
        <TramiteForm onSubmitted={handleSubmitted} />
      ) : (
        <div className="max-w-2xl mx-auto">
          <NotificationBanner
            type="success"
            message={`¡Trámite recibido con éxito! Tu ID es: ${submittedResult.tramite_id}`}
          />
          <div className="bg-white p-6 rounded-lg shadow mt-4">
            <p className="mb-2"><strong>ID de Trámite:</strong> <span className="font-mono text-lg text-blue-600">{submittedResult.tramite_id}</span></p>
            <p className="mb-2"><strong>Estado:</strong> {submittedResult.status}</p>
            <p className="mb-2"><strong>Tipo:</strong> {submittedResult.tipo_solicitud}</p>
            <p className="mb-2"><strong>Prioridad:</strong> <span className={`font-bold ${submittedResult.prioridad === 'alta' ? 'text-red-600' : submittedResult.prioridad === 'media' ? 'text-yellow-600' : 'text-green-600'}`}>{submittedResult.prioridad}</span></p>
            <p className="mb-4"><strong>Notificación enviada:</strong> {submittedResult.notificacion_enviada ? 'Sí' : 'No'}</p>
            <button
              onClick={() => setSubmittedResult(null)}
              className="text-blue-600 hover:underline"
            >
              ← Enviar otro trámite
            </button>
          </div>
        </div>
      )}
    </div>
  );
}