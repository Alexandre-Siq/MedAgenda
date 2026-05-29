import { ArrowLeft, LockKeyhole, Mail, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import Brand from '../components/Brand.jsx';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('dr.ricardo@medagenda.local');
  const [senha, setSenha] = useState('medagenda123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, senha);
      navigate(location.state?.from?.pathname ?? '/dashboard', { replace: true });
    } catch (exception) {
      setError(exception.message || 'Não foi possível entrar. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
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
          <p>Esta tela usa o backend real para autenticar o médico com JWT.</p>
          <div className="visual-list">
            <span>Login real</span>
            <span>Token JWT</span>
            <span>Rotas protegidas</span>
          </div>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-card">
          <Brand />
          <div>
            <span className="section-label">Acesso do médico</span>
            <h2>Entrar no painel</h2>
            <p>Use as credenciais de demonstração criadas pelo backend local.</p>
          </div>
          <form className="form-stack" onSubmit={handleSubmit}>
            <label>
              <span>E-mail</span>
              <div className="input-with-icon">
                <Mail size={16} />
                <input
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  value={email}
                />
              </div>
            </label>
            <label>
              <span>Senha</span>
              <div className="input-with-icon">
                <LockKeyhole size={16} />
                <input
                  autoComplete="current-password"
                  onChange={(event) => setSenha(event.target.value)}
                  required
                  type="password"
                  value={senha}
                />
              </div>
            </label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="btn btn-primary full" disabled={loading} type="submit">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <p className="login-hint">
            Backend esperado em <strong>http://localhost:8080</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
