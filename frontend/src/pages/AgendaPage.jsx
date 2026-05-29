import { Plus } from 'lucide-react';
import { useState } from 'react';
import Badge from '../components/Badge.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { weeklySlots } from '../data/mockData.js';

function AgendaPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PageHeader
        breadcrumbs={['Dashboard', 'Agenda Semanal']}
        actions={<button className="btn btn-primary btn-sm" type="button" onClick={() => setModalOpen(true)}><Plus size={15} /> Novo horário</button>}
      />
      <main className="content-area">
        <section className="page-intro compact">
          <span className="section-label">Disponibilidade</span>
          <h1>Agenda semanal</h1>
          <p>Visualização mockada para demonstrar slots disponíveis e horários ocupados.</p>
        </section>

        <section className="week-grid">
          {weeklySlots.map((day) => (
            <article className="day-column" key={day.day}>
              <header>
                <strong>{day.day}</strong>
                <Badge>{day.slots.length} slots</Badge>
              </header>
              <div className="slot-list">
                {day.slots.map((slot) => (
                  <button className={`calendar-slot ${slot.status}`} key={`${day.day}-${slot.time}`} type="button">
                    <span>{slot.time}</span>
                    <small>{slot.label}</small>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>

      {modalOpen && (
        <div className="modal-overlay" role="presentation" onClick={() => setModalOpen(false)}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-label="Novo horário" onClick={(event) => event.stopPropagation()}>
            <div className="panel-title-row">
              <div>
                <span className="section-label">Agenda</span>
                <h2>Novo horário</h2>
              </div>
              <button className="btn btn-secondary btn-sm" type="button" onClick={() => setModalOpen(false)}>Fechar</button>
            </div>
            <form className="form-grid">
              <label><span>Data</span><input type="date" defaultValue="2026-05-29" /></label>
              <label><span>Hora início</span><input type="time" defaultValue="09:00" /></label>
              <label><span>Hora fim</span><input type="time" defaultValue="09:30" /></label>
              <label><span>Tipo</span><select defaultValue="Consulta"><option>Consulta</option><option>Retorno</option><option>Teleconsulta</option></select></label>
              <button className="btn btn-primary full-span" type="button" onClick={() => setModalOpen(false)}>Salvar horário</button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default AgendaPage;
