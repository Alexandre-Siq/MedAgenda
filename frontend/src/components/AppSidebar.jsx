import { Bot, CalendarDays, LayoutDashboard, Settings, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Brand from './Brand.jsx';

const menuItems = [
  { label: 'Painel Geral', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Agenda Semanal', to: '/agenda', icon: CalendarDays },
  { label: 'Pacientes', to: '/pacientes', icon: Users },
  { label: 'Chatbot (Preview)', to: '/chatbot', icon: Bot },
  { label: 'Configuracoes', to: '/configuracoes', icon: Settings },
];

function AppSidebar({ onNavigate }) {
  return (
    <aside className="app-sidebar" aria-label="Navegacao do medico">
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
          <strong>Dr. Ricardo Lima</strong>
          <small>Cardiologia</small>
        </span>
      </footer>
    </aside>
  );
}

export default AppSidebar;
