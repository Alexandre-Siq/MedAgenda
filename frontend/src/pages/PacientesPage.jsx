import { Eye, Pencil, Plus, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { apiRequest, authHeader } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';
import PageHeader from '../components/PageHeader.jsx';

const emptyForm = {
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  dataNascimento: '',
};

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
}

function buildPacientePayload(form) {
  return {
    nome: form.nome.trim(),
    email: form.email.trim() || null,
    telefone: form.telefone.trim() || null,
    cpf: form.cpf.trim() || null,
    dataNascimento: form.dataNascimento || null,
  };
}

function PacientesPage() {
  const { auth } = useAuth();
  const [search, setSearch] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

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

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setForm(emptyForm);
    setFormError('');
  }

  async function handleCreatePaciente(event) {
    event.preventDefault();
    setFormError('');
    setSaving(true);

    try {
      const novoPaciente = await apiRequest('/api/pacientes', {
        method: 'POST',
        headers: authHeader(auth),
        body: JSON.stringify(buildPacientePayload(form)),
      });

      setPacientes((current) => [novoPaciente, ...current]);
      setSearch('');
      setModalOpen(false);
      setForm(emptyForm);
    } catch (exception) {
      setFormError(exception.message || 'Não foi possível cadastrar o paciente.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={['Dashboard', 'Pacientes']}
        actions={<button className="btn btn-primary btn-sm" type="button" onClick={() => setModalOpen(true)}><Plus size={15} /> Novo paciente</button>}
      />
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

      {modalOpen && (
        <div className="modal-overlay" role="presentation" onClick={closeModal}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-label="Novo paciente" onClick={(event) => event.stopPropagation()}>
            <div className="panel-title-row">
              <div>
                <span className="section-label">Pacientes</span>
                <h2>Novo paciente</h2>
              </div>
              <button className="btn btn-secondary btn-sm" type="button" onClick={closeModal}>Fechar</button>
            </div>

            <form className="form-grid" onSubmit={handleCreatePaciente}>
              <label>
                <span>Nome</span>
                <input value={form.nome} onChange={(event) => updateForm('nome', event.target.value)} required maxLength="120" />
              </label>
              <label>
                <span>E-mail</span>
                <input value={form.email} onChange={(event) => updateForm('email', event.target.value)} type="email" maxLength="160" />
              </label>
              <label>
                <span>Telefone</span>
                <input value={form.telefone} onChange={(event) => updateForm('telefone', event.target.value)} maxLength="20" placeholder="(11) 99999-9999" />
              </label>
              <label>
                <span>CPF</span>
                <input value={form.cpf} onChange={(event) => updateForm('cpf', event.target.value)} maxLength="14" placeholder="Somente números ou formatado" />
              </label>
              <label className="full-span">
                <span>Data de nascimento</span>
                <input value={form.dataNascimento} onChange={(event) => updateForm('dataNascimento', event.target.value)} type="date" />
              </label>

              {formError && <p className="form-error full-span" role="alert">{formError}</p>}

              <button className="btn btn-primary full-span" disabled={saving} type="submit">
                {saving ? 'Salvando...' : 'Cadastrar paciente'}
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default PacientesPage;
