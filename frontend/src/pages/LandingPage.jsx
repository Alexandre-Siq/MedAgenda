import { Bot, CalendarCheck, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Brand from '../components/Brand.jsx';
import FeatureCard from '../components/FeatureCard.jsx';

const features = [
  {
    icon: CalendarCheck,
    title: 'Gestao de agenda',
    description: 'Crie blocos de disponibilidade, acompanhe consultas e organize a rotina medica em uma tela limpa.',
  },
  {
    icon: Bot,
    title: 'Chatbot de marcacao',
    description: 'Pacientes simulam o agendamento com um assistente que sugere horarios e confirma escolhas.',
  },
  {
    icon: ShieldCheck,
    title: 'Painel do medico',
    description: 'Visualize consultas do dia, pacientes e configuracoes em um fluxo pensado para demonstracao local.',
  },
];

function LandingPage() {
  return (
    <div className="public-page">
      <header className="landing-header">
        <Brand />
        <nav className="landing-nav" aria-label="Navegacao publica">
          <Link to="/chatbot">Marcar consulta</Link>
          <Link className="btn btn-primary btn-sm" to="/login">Entrar</Link>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <span className="eyebrow">Agendamento clinico</span>
          <h1>Sua agenda medica organizada. Marcacoes automatizadas via chatbot.</h1>
          <p>
            MedAgenda conecta medicos e pacientes em uma unica plataforma. O medico gerencia sua disponibilidade; o paciente marca consulta conversando com um assistente.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/login">
              Sou medico - Acessar painel
              <MessageCircle size={16} />
            </Link>
            <Link className="btn btn-secondary" to="/chatbot">Sou paciente - Marcar consulta</Link>
          </div>
        </section>

        <section className="feature-grid" aria-label="Funcionalidades">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </section>
      </main>

      <footer className="landing-footer">
        <span>MedAgenda</span>
        <span>Projeto academico em evolucao</span>
      </footer>
    </div>
  );
}

export default LandingPage;
