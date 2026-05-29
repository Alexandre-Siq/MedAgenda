import { Eye, Pencil, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { apiRequest, authHeader } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';
import PageHeader from '../components/PageHeader.jsx';

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
}

function PacientesPage() {
  const { auth } = useAuth();
  const [search, setSearch] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function carregarPacientes() {
      setLoading(true);
      setError('');

      try {
        const data = await apiRequest('/api/pacientes', {
          headers: authHeader(auth),
        });

        if (active) {
          setPacientes(data ?? []);
        }
      } catch (exception) {
        if (active) {
          setError(exception.message || 'Não foi possível carregar os pacientes.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    carregarPacientes();

    return () => {
      active = false;
    };
  }, [auth]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return pacientes;
    }

    return pacientes.filter((paciente) => (
      paciente.nome?.toLowerCase().includes(term)
      || paciente.email?.toLowerCase().includes(term)
      || paciente.telefone?.toLowerCase().includes(term)
      || paciente.cpf?.toLowerCase().includes(term)
    ));
  }, [pacientes, search]);

  return (
    <>
      <PageHeader breadcrumbs={['Dashboard', 'Pacientes']} />
      <main className="content-area">
        <section className="panel-card">
          <div className="panel-title-row">
            <div>
              <span className="section-label">Cadastro real</span>
              <h1>Pacientes</h1>
            </div>
            <div className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar paciente" />
            </div>
          </div>

          {loading && <p className="state-message">Carregando pacientes do backend...</p>}
          {error && <p className="form-error" role="alert">{error}</p>}

          {!loading && !error && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>E-mail</th>
                    <th>CPF</th>
                    <th>Cadastro</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((paciente) => (
                    <tr key={paciente.id}>
                      <td><strong>{paciente.nome}</strong></td>
                      <td>{paciente.telefone || '-'}</td>
                      <td>{paciente.email || '-'}</td>
                      <td>{paciente.cpf || '-'}</td>
                      <td>{formatDate(paciente.criadoEm)}</td>
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
              {filtered.length === 0 && (
                <p className="state-message">Nenhum paciente encontrado para a busca atual.</p>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default PacientesPage;
