import { Bot, CalendarDays, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import Brand from './Brand.jsx';

const menuItems = [
  { label: 'Painel Geral', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Agenda semanal', to: '/agenda', icon: CalendarDays },
  { label: 'Pacientes', to: '/pacientes', icon: Users },
  { label: 'Chatbot (Preview)', to: '/chatbot', icon: Bot },
  { label: 'Configurações', to: '/configuracoes', icon: Settings },
];

function AppSidebar({ onNavigate }) {
  const { logout, usuario } = useAuth();

  function handleLogout() {
    logout();
    onNavigate?.();
  }

  return (
    <aside className="app-sidebar" aria-label="Navegação do médico">
      <div className="sidebar-header">
        <Brand to="/dashboard" />
      </div>

      <nav className="sidebar-nav">
        <span className="section-label">Menu</span>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              key={item.to}
              onClick={onNavigate}
              to={item.to}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <footer className="sidebar-footer">
        <span className="avatar">DR</span>
        <span>
          <strong>{usuario?.nome ?? 'Dr. Ricardo Lima'}</strong>
          <small>{usuario?.papel ?? 'PROFISSIONAL'}</small>
        </span>
        <button className="logout-button" type="button" onClick={handleLogout} aria-label="Sair">
          <LogOut size={15} />
        </button>
      </footer>
    </aside>
  );
}

export default AppSidebar;
