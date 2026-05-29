import { ArrowLeft, LockKeyhole, Mail, Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Brand from '../components/Brand.jsx';

function LoginPage() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div className="login-page">
      <section className="login-visual" aria-label="Resumo do produto">
        <Link className="back-link" to="/">
          <ArrowLeft size={16} /> Voltar
        </Link>
        <div className="login-visual-card">
          <span className="visual-icon"><Stethoscope size={22} /></span>
          <h1>Controle sua rotina clínica em poucos cliques.</h1>
          <p>Esta tela simula o acesso do médico para demonstração local ao professor.</p>
          <div className="visual-list">
            <span>Agenda semanal</span>
            <span>Pacientes</span>
            <span>Chatbot preview</span>
          </div>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-card">
          <Brand />
          <div>
            <span className="section-label">Acesso do médico</span>
            <h2>Entrar no painel</h2>
            <p>Use qualquer e-mail e senha para navegar no protótipo visual.</p>
          </div>
          <form className="form-stack" onSubmit={handleSubmit}>
            <label>
              <span>E-mail</span>
              <div className="input-with-icon">
                <Mail size={16} />
                <input defaultValue="dr.ricardo@medagenda.local" type="email" />
              </div>
            </label>
            <label>
              <span>Senha</span>
              <div className="input-with-icon">
                <LockKeyhole size={16} />
                <input defaultValue="medagenda123" type="password" />
              </div>
            </label>
            <button className="btn btn-primary full" type="submit">Entrar</button>
          </form>
          <a className="muted-link" href="mailto:suporte@medagenda.local">Esqueci minha senha</a>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
