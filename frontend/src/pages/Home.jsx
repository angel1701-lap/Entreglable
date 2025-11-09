// src/pages/Home.jsx
export default function Home({ setPage }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-8 md:p-12 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Municipalidad Provincial de Yau
        </h1>
        <p className="text-base text-gray-600 max-w-3xl mx-auto">
          Sistema de gestión de trámites con inteligencia artificial para un servicio más rápido, transparente y eficiente.
        </p>
      </div>

      {/* Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="bg-gray-100 w-14 h-14 rounded-sm flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Subir Trámite</h3>
            <p className="text-sm text-gray-600 mb-6">
              Envía tu solicitud o documento de forma digital y segura. Recibe confirmación inmediata.
            </p>
            <button
              onClick={() => setPage('subir')}
              className="w-full py-2.5 px-4 bg-gray-800 text-white text-sm font-medium rounded-sm hover:bg-gray-900 transition-colors"
            >
              Iniciar trámite
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="bg-gray-100 w-14 h-14 rounded-sm flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Consultar Estado</h3>
            <p className="text-sm text-gray-600 mb-6">
              Ingresa tu ID de trámite y conoce el estado actual de tu solicitud en tiempo real.
            </p>
            <button
              onClick={() => setPage('consultar')}
              className="w-full py-2.5 px-4 bg-gray-800 text-white text-sm font-medium rounded-sm hover:bg-gray-900 transition-colors"
            >
              Consultar ahora
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="bg-gray-100 w-14 h-14 rounded-sm flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Panel Administrativo</h3>
            <p className="text-sm text-gray-600 mb-6">
              Acceso exclusivo para personal municipal. Gestiona y prioriza solicitudes.
            </p>
            <button
              onClick={() => setPage('login')}
              className="w-full py-2.5 px-4 bg-gray-700 text-white text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors"
            >
              Acceso admin
            </button>
          </div>
        </div>
      </div>

      {/* Características */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Características del Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-800 mb-1">Procesamiento Rápido</h4>
            <p className="text-sm text-gray-600">IA para priorización automática de trámites críticos</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-800 mb-1">Notificaciones</h4>
            <p className="text-sm text-gray-600">Alertas por correo sobre el estado de tu trámite</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-800 mb-1">Seguridad</h4>
            <p className="text-sm text-gray-600">Protección de datos y transparencia garantizada</p>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center text-sm text-gray-500 pb-4">
        <p>Sistema de gestión municipal con tecnología de inteligencia artificial</p>
      </div>
    </div>
  );
}