// src/components/Header.jsx
import { useAuth } from '../context/AuthContext';

export default function Header({ setPage, currentPage }) {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setPage('home');
  };

  return (
    <header className="bg-gray-800 text-white shadow-sm border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2M7 21h10m-6-6v4m0-8v4" />
            </svg>
            <div>
              <h1 className="text-lg font-semibold">Municipalidad de Yau</h1>
              <p className="text-xs text-gray-400">Sistema de Gestión de Trámites</p>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => setPage('home')}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                currentPage === 'home' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setPage('subir')}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                currentPage === 'subir' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Subir Trámite
            </button>
            <button
              onClick={() => setPage('consultar')}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                currentPage === 'consultar' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Consultar Estado
            </button>
            
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setPage('dashboard')}
                  className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                    currentPage === 'dashboard' 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-600">
                  <span className="text-xs text-gray-400">
                    {user?.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded-sm transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setPage('login')}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ml-2 ${
                  currentPage === 'login' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Admin
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}