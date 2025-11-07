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
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800">Enviar nuevo trámite</h2>

      {message && <div className="text-red-600">{message}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de trámite</label>
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="general">General</option>
          <option value="licencia">Licencia de construcción</option>
          <option value="denuncia">Denuncia o reclamo</option>
          <option value="cv">Postulación a empleo (CV)</option>
          <option value="certificado">Certificado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Documento (PDF, JPG o PNG)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white ${
          loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Enviando...' : 'Enviar trámite'}
      </button>
    </form>
  );
}