import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DoctorLayout from './layouts/DoctorLayout.jsx';
import AgendaPage from './pages/AgendaPage.jsx';
import ChatbotPage from './pages/ChatbotPage.jsx';
import ConfiguracoesPage from './pages/ConfiguracoesPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PacientesPage from './pages/PacientesPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route element={<DoctorLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/configuracoes" element={<ConfiguracoesPage />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
