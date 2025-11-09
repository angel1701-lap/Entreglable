// src/pages/SubirTramite.jsx
import { useState } from 'react';
import TramiteForm from '../components/TramiteForm';

export default function SubirTramite() {
  const [submittedResult, setSubmittedResult] = useState(null);

  const handleSubmitted = (result) => {
    setSubmittedResult(result);
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Subir Nuevo Trámite</h1>
        <p className="text-sm text-gray-600">Complete el formulario para enviar su solicitud o documento</p>
      </div>

      {!submittedResult ? (
        <TramiteForm onSubmitted={handleSubmitted} />
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-sm p-4 mb-4">
            <p className="text-green-800 text-sm font-medium">
              ✓ Trámite recibido con éxito
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">Detalles del trámite</h3>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">ID de Trámite:</span>
                <span className="font-mono text-sm text-gray-900 font-semibold">{submittedResult.tramite_id}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Estado:</span>
                <span className="text-sm text-gray-900">{submittedResult.status}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Tipo:</span>
                <span className="text-sm text-gray-900">{submittedResult.tipo_solicitud}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Prioridad:</span>
                <span className={`text-sm font-medium ${submittedResult.prioridad === 'alta' ? 'text-red-700' :
                  submittedResult.prioridad === 'media' ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>
                  {submittedResult.prioridad.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-sm font-medium text-gray-600">Notificación enviada:</span>
                <span className="text-sm text-gray-900">{submittedResult.notificacion_enviada ? 'Sí' : 'No'}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setSubmittedResult(null)}
                className="text-sm text-gray-700 hover:text-gray-900 font-medium"
              >
                ← Enviar otro trámite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}