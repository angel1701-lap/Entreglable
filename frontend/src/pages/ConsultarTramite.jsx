// src/pages/ConsultarTramite.jsx
import { useState } from "react";
import { getTramiteStatus } from "../services/api";

export default function ConsultarTramite() {
  const [id, setId] = useState("");
  const [tramite, setTramite] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setTramite(null);

    try {
      const data = await getTramiteStatus(id);
      setTramite(data);
    } catch (err) {
      setError("Trámite no encontrado o error en el sistema.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Consultar Estado</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Ingresa tu ID de trámite"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Buscar
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
      {tramite && (
        <div className="border p-4 rounded bg-gray-50">
          <p><strong>ID:</strong> {tramite.tramite_id}</p>
          <p><strong>Estado:</strong> {tramite.status}</p>
          <p><strong>Prioridad:</strong> <span className={`font-bold ${tramite.prioridad === 'alta' ? 'text-red-600' : tramite.prioridad === 'media' ? 'text-yellow-600' : 'text-green-600'}`}>{tramite.prioridad}</span></p>
          <p><strong>Última actualización:</strong> {new Date(tramite.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}