// src/App.jsx
import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import SubirTramite from "./pages/SubirTramite";
import ConsultarTramite from "./pages/ConsultarTramite";
import DashboardAdmin from "./pages/DashboardAdmin";
import Login from "./pages/Login";

function AppContent() {
  const [page, setPage] = useState("home");
  const { isAuthenticated } = useAuth();

  const renderPage = () => {
    switch (page) {
      case "subir": 
        return <SubirTramite />;
      case "consultar": 
        return <ConsultarTramite />;
      case "login": 
        return <Login onLoginSuccess={() => setPage('dashboard')} />;
      case "dashboard": 
        return isAuthenticated ? <DashboardAdmin /> : <Login onLoginSuccess={() => setPage('dashboard')} />;
      default: 
        return <Home setPage={setPage} />;
    }
  };

  // Si estamos en la página de login, no mostrar el header
  if (page === "login" && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setPage={setPage} currentPage={page} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}