import FeatureCard from './FeatureCard.jsx';

const features = [
  {
    eyebrow: 'Agenda',
    title: 'Organizacao clara',
    description: 'Visualize horarios, profissionais e atendimentos com foco na rotina da clinica.',
  },
  {
    eyebrow: 'Pacientes',
    title: 'Experiencia simples',
    description: 'Prepare uma jornada objetiva para marcacoes, confirmacoes e acompanhamento.',
  },
  {
    eyebrow: 'Operacao',
    title: 'Base segura',
    description: 'Fundacao pensada para evoluir com autenticao, regras de negocio e dados clinicos.',
  },
];

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-kicker">Plataforma para gestao de agendas medicas</p>
        <h1>Menos atrito para organizar atendimentos de saude.</h1>
        <p className="hero-copy">
          O MedAgenda nasce para centralizar rotinas de agenda, comunicacao e
          acompanhamento operacional em uma interface limpa e confiavel.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#recursos">
            Conhecer recursos
          </a>
          <a className="button button-secondary" href="mailto:contato@medagenda.local" id="contato">
            Falar com o time
          </a>
        </div>
      </div>
      <div className="hero-panel" aria-label="Resumo visual da agenda">
        <div className="panel-header">
          <span>Hoje</span>
          <strong>12 consultas</strong>
        </div>
        <div className="appointment-card active">
          <span>09:00</span>
          <div>
            <strong>Consulta inicial</strong>
            <small>Dra. Ana Martins</small>
          </div>
        </div>
        <div className="appointment-card">
          <span>10:30</span>
          <div>
            <strong>Retorno</strong>
            <small>Dr. Bruno Lima</small>
          </div>
        </div>
        <div className="appointment-card">
          <span>14:00</span>
          <div>
            <strong>Teleatendimento</strong>
            <small>Dra. Camila Rocha</small>
          </div>
        </div>
      </div>
      <div className="features" id="recursos">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
