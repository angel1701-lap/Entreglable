// src/components/TramiteForm.jsx
import { useState } from 'react';
import { submitTramite } from '../services/api';

export default function TramiteForm({ onSubmitted }) {
  const [formData, setFormData] = useState({
    email: '',
    tipo: 'general',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !formData.email) {
      setMessage('Por favor completa todos los campos.');
      return;
    }

    const form = new FormData();
    form.append('email', formData.email);
    form.append('tipo_solicitud', formData.tipo);
    form.append('file', file);

    setLoading(true);
    setMessage('');

    try {
      const result = await submitTramite(form);
      onSubmitted(result);
    } catch (err) {
      setMessage('Error al enviar el trámite. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-sm shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">Enviar nuevo trámite</h2>
      </div>

      <div className="px-6 py-6 space-y-5">
        {message && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
            {message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de trámite
          </label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="general">General</option>
            <option value="licencia">Licencia de construcción</option>
            <option value="denuncia">Denuncia o reclamo</option>
            <option value="cv">Postulación a empleo (CV)</option>
            <option value="certificado">Certificado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Documento adjunto
          </label>
          <div className="border border-gray-300 rounded-sm px-3 py-2 bg-gray-50">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-sm file:font-medium file:bg-gray-700 file:text-white hover:file:bg-gray-800 file:cursor-pointer"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Formatos permitidos: PDF, JPG, PNG</p>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 px-4 rounded-sm text-sm font-medium transition-colors ${
            loading 
              ? 'bg-gray-400 text-gray-100 cursor-not-allowed' 
              : 'bg-gray-800 text-white hover:bg-gray-900'
          }`}
        >
          {loading ? 'Enviando...' : 'Enviar trámite'}
        </button>
      </div>
    </form>
  );
}