import { Bot, CalendarCheck, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Brand from '../components/Brand.jsx';
import FeatureCard from '../components/FeatureCard.jsx';

const features = [
  {
    icon: CalendarCheck,
    title: 'Gestão de agenda',
    description: 'Crie blocos de disponibilidade, acompanhe consultas e organize a rotina médica em uma tela limpa.',
  },
  {
    icon: Bot,
    title: 'Chatbot de marcação',
    description: 'Pacientes simulam o agendamento com um assistente que sugere horários e confirma escolhas.',
  },
  {
    icon: ShieldCheck,
    title: 'Painel do médico',
    description: 'Visualize consultas do dia, pacientes e configurações em um fluxo pensado para demonstração local.',
  },
];

function LandingPage() {
  return (
    <div className="public-page">
      <header className="landing-header">
        <Brand />
        <nav className="landing-nav" aria-label="Navegação pública">
          <Link to="/chatbot">Marcar consulta</Link>
          <Link className="btn btn-primary btn-sm" to="/login">Entrar</Link>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <span className="eyebrow">Agendamento clínico</span>
          <h1>Sua agenda médica organizada. Marcações automatizadas via chatbot.</h1>
          <p>
            MedAgenda conecta médicos e pacientes em uma única plataforma. O médico gerencia sua disponibilidade; o paciente marca consulta conversando com um assistente.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/login">
              Sou médico - Acessar painel
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
        <span>Projeto acadêmico em evolução</span>
      </footer>
    </div>
  );
}

export default LandingPage;
