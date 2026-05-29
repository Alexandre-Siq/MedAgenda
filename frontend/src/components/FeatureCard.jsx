function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="feature-card">
      {Icon && (
        <span className="feature-icon" aria-hidden="true">
          <Icon size={18} />
        </span>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default FeatureCard;
