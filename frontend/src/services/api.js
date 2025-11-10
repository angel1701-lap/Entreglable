// src/services/api.js
const API_BASE = "http://localhost:8000/api/v1"; // Ajusta según tu backend

export const submitTramite = async (formData) => {
  const res = await fetch(`${API_BASE}/tramites`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

export const getTramiteStatus = async (id) => {
  const res = await fetch(`${API_BASE}/tramites/${id}`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

export const getAllTramites = async () => {
  const res = await fetch(`${API_BASE}/tramites`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

export const sendMessageToCitizen = async (tramiteId, email, subject, message) => {
  const res = await fetch(`http://localhost:8000/tramites/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tramite_id: tramiteId,
      email: email,
      subject: subject,
      message: message
    }),
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
};