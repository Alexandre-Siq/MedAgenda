import { Eye, Pencil, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { pacientes } from '../data/mockData.js';

function PacientesPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () => pacientes.filter((paciente) => paciente.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <>
      <PageHeader breadcrumbs={['Dashboard', 'Pacientes']} />
      <main className="content-area">
        <section className="panel-card">
          <div className="panel-title-row">
            <div>
              <span className="section-label">Cadastro</span>
              <h1>Pacientes</h1>
            </div>
            <div className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar paciente" />
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Ultima consulta</th>
                  <th>Proxima consulta</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((paciente) => (
                  <tr key={paciente.name}>
                    <td><strong>{paciente.name}</strong></td>
                    <td>{paciente.phone}</td>
                    <td>{paciente.last}</td>
                    <td>{paciente.next}</td>
                    <td>
                      <div className="row-actions">
                        <button className="icon-button" type="button" aria-label="Ver paciente"><Eye size={15} /></button>
                        <button className="icon-button" type="button" aria-label="Editar paciente"><Pencil size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default PacientesPage;
