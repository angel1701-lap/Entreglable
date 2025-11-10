// src/components/TramiteList.jsx
import { useState } from 'react';

export default function TramiteList({ tramites = [], onSendMessage }) {
  const [selectedTramite, setSelectedTramite] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

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

  const handleSendMessage = (tramite) => {
    setSelectedTramite(tramite);
    setShowMessageModal(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-600 uppercase">ID</th>
              <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-600 uppercase">Tipo</th>
              <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-600 uppercase">Prioridad</th>
              <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-600 uppercase">Estado</th>
              <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-600 uppercase">Correo</th>
              <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-600 uppercase">Fecha</th>
              <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-600 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tramites.map((t) => (
              <tr key={t.tramite_id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">
                  <span className="font-mono text-sm font-semibold text-gray-900">{t.tramite_id}</span>
                </td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{t.tipo_solicitud}</td>
                <td className="py-3 px-4 border-b">
                  <span className={`text-xs px-2 py-1 rounded-sm font-medium ${getPriorityClass(t.prioridad)}`}>
                    {t.prioridad.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4 border-b text-sm text-gray-700">{t.status}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-600">{t.email}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-600">
                  {t.timestamp ? new Date(t.timestamp).toLocaleDateString('es-PE') : '—'}
                </td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => handleSendMessage(t)}
                    className="inline-flex items-center px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-sm hover:bg-gray-900 transition-colors"
                    title="Enviar mensaje al ciudadano"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Mensaje
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para enviar mensaje */}
      {showMessageModal && selectedTramite && (
        <MessageModal
          tramite={selectedTramite}
          onClose={() => {
            setShowMessageModal(false);
            setSelectedTramite(null);
          }}
          onSend={onSendMessage}
        />
      )}
    </>
  );
}

// Componente Modal para enviar mensaje
function MessageModal({ tramite, onClose, onSend }) {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState(`Actualización de su trámite #${tramite.tramite_id}`);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!message.trim()) {
      setError('Por favor ingrese un mensaje');
      return;
    }

    setSending(true);
    setError('');

    try {
      await onSend(tramite.tramite_id, tramite.email, subject, message);
      onClose();
    } catch (err) {
      setError('Error al enviar el mensaje. Intente nuevamente.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-sm shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Enviar Mensaje al Ciudadano</h3>
            <p className="text-sm text-gray-600 mt-1">Trámite: {tramite.tramite_id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          {/* Información del trámite */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-600">Destinatario:</span>
                <p className="text-gray-900">{tramite.email}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Tipo:</span>
                <p className="text-gray-900">{tramite.tipo_solicitud}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Estado:</span>
                <p className="text-gray-900">{tramite.status}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Prioridad:</span>
                <p className="text-gray-900">{tramite.prioridad}</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
              {error}
            </div>
          )}

          {/* Campo: Asunto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asunto del correo
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              placeholder="Asunto del mensaje"
            />
          </div>

          {/* Campo: Mensaje */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensaje
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              placeholder="Escriba su mensaje aquí..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Este mensaje será enviado al correo del ciudadano
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm hover:bg-gray-50"
            disabled={sending}
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className={`px-4 py-2 text-sm font-medium text-white rounded-sm ${
              sending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-gray-900'
            }`}
          >
            {sending ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </div>
      </div>
    </div>
  );
}