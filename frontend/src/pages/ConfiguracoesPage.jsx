import PageHeader from '../components/PageHeader.jsx';

function ConfiguraçõesPage() {
  return (
    <>
      <PageHeader breadcrumbs={['Dashboard', 'Configurações']} />
      <main className="content-area settings-grid">
        <section className="panel-card">
          <span className="section-label">Perfil</span>
          <h1>Dados do médico</h1>
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
            <textarea defaultValue="Olá! Sou o assistente do MedAgenda. Posso ajudar você a marcar uma consulta." rows="5" />
          </label>
          <button className="btn btn-primary" type="button">Salvar configurações</button>
        </section>
      </main>
    </>
  );
}

export default ConfiguraçõesPage;
