// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import SubirTramite from "./pages/SubirTramite";
import ConsultarTramite from "./pages/ConsultarTramite";
import DashboardAdmin from "./pages/DashboardAdmin";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "subir": return <SubirTramite />;
      case "consultar": return <ConsultarTramite />;
      case "dashboard": return <DashboardAdmin />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setPage={setPage} />
      <main className="py-8">{renderPage()}</main>
    </div>
  );
}