import PageHeader from '../components/PageHeader.jsx';

function ConfiguracoesPage() {
  return (
    <>
      <PageHeader breadcrumbs={['Dashboard', 'Configuracoes']} />
      <main className="content-area settings-grid">
        <section className="panel-card">
          <span className="section-label">Perfil</span>
          <h1>Dados do medico</h1>
          <form className="form-grid settings-form">
            <label><span>Nome</span><input defaultValue="Dr. Ricardo Lima" /></label>
            <label><span>CRM</span><input defaultValue="CRM-SP 123456" /></label>
            <label><span>Especialidade</span><input defaultValue="Cardiologia" /></label>
            <label><span>E-mail</span><input defaultValue="dr.ricardo@medagenda.local" /></label>
          </form>
        </section>

        <section className="panel-card">
          <span className="section-label">Chatbot</span>
          <h2>Mensagem de boas-vindas</h2>
          <label className="textarea-field">
            <span>Mensagem inicial</span>
            <textarea defaultValue="Ola! Sou o assistente do MedAgenda. Posso ajudar voce a marcar uma consulta." rows="5" />
          </label>
          <button className="btn btn-primary" type="button">Salvar configuracoes</button>
        </section>
      </main>
    </>
  );
}

export default ConfiguracoesPage;
