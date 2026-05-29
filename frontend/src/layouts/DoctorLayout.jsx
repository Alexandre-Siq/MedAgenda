import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from '../components/AppSidebar.jsx';
import Brand from '../components/Brand.jsx';

function DoctorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="doctor-shell">
      <button
        className="sidebar-overlay"
        type="button"
        aria-label="Fechar menu"
        data-open={sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <div className="sidebar-wrap" data-open={sidebarOpen}>
        <AppSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>
      <div className="doctor-main">
        <div className="mobile-topbar">
          <Brand to="/dashboard" />
          <button className="icon-button" type="button" onClick={() => setSidebarOpen((open) => !open)}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default DoctorLayout;
