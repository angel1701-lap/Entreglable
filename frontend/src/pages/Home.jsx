// src/pages/Home.jsx
import React from 'react';

export default function Home({ setPage }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Bienvenido a la Municipalidad Provincial de Yau
        </h1>
        <p className="text-lg text-gray-600">
          Modernizamos la gestión de trámites con inteligencia artificial para brindarte un servicio más rápido, transparente y eficiente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Subir Trámite</h3>
          <p className="text-gray-600 mb-4">Envía tu solicitud o currículo de forma digital y segura.</p>
          <button
            onClick={() => setPage('subir')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Iniciar ahora
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Consultar Estado</h3>
          <p className="text-gray-600 mb-4">Ingresa tu ID y conoce el estado actual de tu trámite.</p>
          <button
            onClick={() => setPage('consultar')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Consultar
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Dashboard (Admin)</h3>
          <p className="text-gray-600 mb-4">Personal municipal: gestiona y prioriza solicitudes.</p>
          <button
            onClick={() => setPage('dashboard')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Acceder
          </button>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-600 text-sm">
        <p>Este sistema utiliza inteligencia artificial para priorizar trámites críticos y notificar en tiempo real.</p>
        <p className="mt-2">Cumple con las normas de protección de datos y transparencia de la gestión pública.</p>
      </div>
    </div>
  );
}