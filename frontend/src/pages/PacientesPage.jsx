import { Eye, Pencil, Plus, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { apiRequest, authHeader, isDemoMode } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';
import PageHeader from '../components/PageHeader.jsx';

const emptyForm = {
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  dataNascimento: '',
};

const DEMO_PATIENTS_KEY = 'medagenda.demo.pacientes';

const initialDemoPatients = [
  {
    id: 1,
    nome: 'Mariana Alves',
    email: 'mariana.alves@email.com',
    telefone: '(11) 98888-2201',
    cpf: '52998224725',
    dataNascimento: '1992-04-12',
    criadoEm: '2026-05-29T09:00:00.000Z',
    atualizadoEm: '2026-05-29T09:00:00.000Z',
  },
  {
    id: 2,
    nome: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    telefone: '(11) 97777-1902',
    cpf: '39053344705',
    dataNascimento: '1985-08-23',
    criadoEm: '2026-05-29T09:05:00.000Z',
    atualizadoEm: '2026-05-29T09:05:00.000Z',
  },
  {
    id: 3,
    nome: 'Helena Costa',
    email: 'helena.costa@email.com',
    telefone: '(21) 96666-4410',
    cpf: '11144477735',
    dataNascimento: '1978-01-30',
    criadoEm: '2026-05-29T09:10:00.000Z',
    atualizadoEm: '2026-05-29T09:10:00.000Z',
  },
];

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(value) {
  if (!value) {
    return '-';
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
}

function onlyDigits(value) {
  return value.replace(/\D/g, '');
}

function cpfValido(value) {
  const cpf = onlyDigits(value);

  if (!/^\d{11}$/.test(cpf) || new Set(cpf).size === 1) {
    return false;
  }

  function calcularDigito(tamanho) {
    let soma = 0;

    for (let index = 0; index < tamanho; index += 1) {
      soma += Number(cpf[index]) * (tamanho + 1 - index);
    }

    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  }

  return Number(cpf[9]) === calcularDigito(9) && Number(cpf[10]) === calcularDigito(10);
}

function pacienteToForm(paciente) {
  return {
    nome: paciente.nome ?? '',
    email: paciente.email ?? '',
    telefone: paciente.telefone ?? '',
    cpf: paciente.cpf ?? '',
    dataNascimento: paciente.dataNascimento ?? '',
  };
}

function buildPacientePayload(form) {
  return {
    nome: form.nome.trim(),
    email: form.email.trim() || null,
    telefone: form.telefone.trim() || null,
    cpf: onlyDigits(form.cpf) || null,
    dataNascimento: form.dataNascimento || null,
  };
}

function readDemoPatients() {
  try {
    const stored = localStorage.getItem(DEMO_PATIENTS_KEY);
    return stored ? JSON.parse(stored) : initialDemoPatients;
  } catch {
    localStorage.removeItem(DEMO_PATIENTS_KEY);
    return initialDemoPatients;
  }
}

function persistDemoPatients(pacientes) {
  localStorage.setItem(DEMO_PATIENTS_KEY, JSON.stringify(pacientes));
}

function validarFormulario(form) {
  if (!form.nome.trim()) {
    return 'Informe o nome do paciente.';
  }

  if (form.cpf.trim() && !cpfValido(form.cpf)) {
    return 'Informe um CPF válido.';
  }

  if (form.dataNascimento && form.dataNascimento > todayIsoDate()) {
    return 'A data de nascimento não pode estar no futuro.';
  }

  return '';
}

function PacientesPage() {
  const { auth } = useAuth();
  const [search, setSearch] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalMode, setModalMode] = useState(null);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const modalOpen = Boolean(modalMode);
  const readOnly = modalMode === 'view';

  useEffect(() => {
    let active = true;

    async function carregarPacientes() {
      setLoading(true);
      setError('');

      if (isDemoMode) {
        setPacientes(readDemoPatients());
        setLoading(false);
        return;
      }

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

  function openCreateModal() {
    setSelectedPaciente(null);
    setForm(emptyForm);
    setFormError('');
    setModalMode('create');
  }

  function openViewModal(paciente) {
    setSelectedPaciente(paciente);
    setForm(pacienteToForm(paciente));
    setFormError('');
    setModalMode('view');
  }

  function openEditModal(paciente) {
    setSelectedPaciente(paciente);
    setForm(pacienteToForm(paciente));
    setFormError('');
    setModalMode('edit');
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setModalMode(null);
    setSelectedPaciente(null);
    setForm(emptyForm);
    setFormError('');
  }

  async function handleSubmitPaciente(event) {
    event.preventDefault();

    if (readOnly) {
      closeModal();
      return;
    }

    const validationMessage = validarFormulario(form);

    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    setFormError('');
    setSaving(true);

    try {
      const isEditing = modalMode === 'edit';
      const payload = buildPacientePayload(form);

      if (isDemoMode) {
        const cpfEmUso = payload.cpf && pacientes.some((paciente) => (
          paciente.cpf === payload.cpf && paciente.id !== selectedPaciente?.id
        ));

        if (cpfEmUso) {
          throw new Error('Já existe paciente cadastrado com este CPF');
        }

        const now = new Date().toISOString();
        const pacienteSalvo = {
          ...(isEditing ? selectedPaciente : { id: Date.now(), criadoEm: now }),
          ...payload,
          atualizadoEm: now,
        };

        setPacientes((current) => {
          const next = isEditing
            ? current.map((paciente) => (paciente.id === pacienteSalvo.id ? pacienteSalvo : paciente))
            : [pacienteSalvo, ...current];
          persistDemoPatients(next);
          return next;
        });
        setSearch('');
        setModalMode(null);
        setSelectedPaciente(null);
        setForm(emptyForm);
        return;
      }

      const pacienteSalvo = await apiRequest(isEditing ? `/api/pacientes/${selectedPaciente.id}` : '/api/pacientes', {
        method: isEditing ? 'PUT' : 'POST',
        headers: authHeader(auth),
        body: JSON.stringify(payload),
      });

      setPacientes((current) => (
        isEditing
          ? current.map((paciente) => (paciente.id === pacienteSalvo.id ? pacienteSalvo : paciente))
          : [pacienteSalvo, ...current]
      ));
      setSearch('');
      setModalMode(null);
      setSelectedPaciente(null);
      setForm(emptyForm);
    } catch (exception) {
      setFormError(exception.message || 'Não foi possível salvar o paciente.');
    } finally {
      setSaving(false);
    }
  }

  function modalTitle() {
    if (modalMode === 'view') {
      return 'Detalhes do paciente';
    }

    if (modalMode === 'edit') {
      return 'Editar paciente';
    }

    return 'Novo paciente';
  }

  return (
    <>
      <PageHeader
        breadcrumbs={['Dashboard', 'Pacientes']}
        actions={<button className="btn btn-primary btn-sm" type="button" onClick={openCreateModal}><Plus size={15} /> Novo paciente</button>}
      />
      <main className="content-area">
        <section className="panel-card">
          <div className="panel-title-row">
            <div>
              <span className="section-label">{isDemoMode ? 'Cadastro demo' : 'Cadastro real'}</span>
              <h1>Pacientes</h1>
            </div>
            <div className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar paciente" />
            </div>
          </div>

          {loading && <p className="state-message">Carregando pacientes...</p>}
          {isDemoMode && !loading && !error && (
            <p className="state-message">Modo demo offline ativo: os pacientes são salvos apenas neste navegador.</p>
          )}
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
                    <th>Nascimento</th>
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
                      <td>{formatDate(paciente.dataNascimento)}</td>
                      <td>{formatDate(paciente.criadoEm)}</td>
                      <td>
                        <div className="row-actions">
                          <button className="icon-button" type="button" aria-label="Ver paciente" onClick={() => openViewModal(paciente)}><Eye size={15} /></button>
                          <button className="icon-button" type="button" aria-label="Editar paciente" onClick={() => openEditModal(paciente)}><Pencil size={15} /></button>
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
          <section className="modal-card" role="dialog" aria-modal="true" aria-label={modalTitle()} onClick={(event) => event.stopPropagation()}>
            <div className="panel-title-row">
              <div>
                <span className="section-label">Pacientes</span>
                <h2>{modalTitle()}</h2>
              </div>
              <button className="btn btn-secondary btn-sm" type="button" onClick={closeModal}>Fechar</button>
            </div>

            <form className="form-grid" onSubmit={handleSubmitPaciente}>
              <label>
                <span>Nome</span>
                <input value={form.nome} onChange={(event) => updateForm('nome', event.target.value)} required maxLength="120" disabled={readOnly} />
              </label>
              <label>
                <span>E-mail</span>
                <input value={form.email} onChange={(event) => updateForm('email', event.target.value)} type="email" maxLength="160" disabled={readOnly} />
              </label>
              <label>
                <span>Telefone</span>
                <input value={form.telefone} onChange={(event) => updateForm('telefone', event.target.value)} maxLength="20" placeholder="(11) 99999-9999" disabled={readOnly} />
              </label>
              <label>
                <span>CPF</span>
                <input value={form.cpf} onChange={(event) => updateForm('cpf', event.target.value)} maxLength="14" placeholder="Somente números ou formatado" disabled={readOnly} />
              </label>
              <label className="full-span">
                <span>Data de nascimento</span>
                <input value={form.dataNascimento} onChange={(event) => updateForm('dataNascimento', event.target.value)} type="date" max={todayIsoDate()} disabled={readOnly} />
              </label>

              {selectedPaciente && (
                <p className="state-message full-span">
                  Criado em {formatDate(selectedPaciente.criadoEm)} · Atualizado em {formatDate(selectedPaciente.atualizadoEm)}
                </p>
              )}

              {formError && <p className="form-error full-span" role="alert">{formError}</p>}

              {!readOnly && (
                <button className="btn btn-primary full-span" disabled={saving} type="submit">
                  {saving ? 'Salvando...' : (modalMode === 'edit' ? 'Salvar alterações' : 'Cadastrar paciente')}
                </button>
              )}
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default PacientesPage;
