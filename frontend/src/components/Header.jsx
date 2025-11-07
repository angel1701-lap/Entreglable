// src/components/Header.jsx
import React from 'react';

export default function Header({ setPage }) {
  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2M7 21h10m-6-6v4m0-8v4" />
          </svg>
          <h1 className="text-xl font-bold">Municipalidad de Yau</h1>
        </div>

        <nav className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setPage('home')}
            className="px-3 py-1 rounded hover:bg-blue-700"
          >
            Inicio
          </button>
          <button
            onClick={() => setPage('subir')}
            className="px-3 py-1 rounded hover:bg-blue-700"
          >
            Subir Trámite
          </button>
          <button
            onClick={() => setPage('consultar')}
            className="px-3 py-1 rounded hover:bg-blue-700"
          >
            Consultar Estado
          </button>
          <button
            onClick={() => setPage('dashboard')}
            className="px-3 py-1 rounded hover:bg-blue-700"
          >
            Dashboard (Admin)
          </button>
        </nav>
      </div>
    </header>
  );
}