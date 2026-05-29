import { CalendarDays, Clock, Plus } from 'lucide-react';
import Badge from '../components/Badge.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { agendaDoDia, dashboardStats } from '../data/mockData.js';

function statusTone(status) {
  if (status === 'Confirmada') return 'success';
  if (status === 'Cancelada') return 'danger';
  return 'primary';
}

function DashboardPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={['Dashboard']}
        actions={<button className="btn btn-primary btn-sm" type="button"><Plus size={15} /> Nova consulta</button>}
      />
      <main className="content-area">
        <section className="page-intro">
          <span className="section-label">Painel geral</span>
          <h1>Bom dia, Dr. Ricardo.</h1>
          <p>Resumo demonstrativo da agenda, pendências e consultas confirmadas.</p>
        </section>

        <section className="stats-grid">
          {dashboardStats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <span className={`stat-icon tone-${stat.tone}`}><CalendarDays size={18} /></span>
              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.hint}</small>
              </div>
            </article>
          ))}
        </section>

        <section className="panel-card">
          <div className="panel-title-row">
            <div>
              <span className="section-label">Agenda do dia</span>
              <h2>Consultas de hoje</h2>
            </div>
            <Badge>29 Mai 2026</Badge>
          </div>
          <div className="agenda-list">
            {agendaDoDia.map((item) => (
              <article className="agenda-item" key={`${item.time}-${item.patient}`}>
                <span className="time-pill"><Clock size={14} /> {item.time}</span>
                <div>
                  <strong>{item.patient}</strong>
                  <small>{item.type}</small>
                </div>
                <Badge tone={statusTone(item.status)}>{item.status}</Badge>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default DashboardPage;
