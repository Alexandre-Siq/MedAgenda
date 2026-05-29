import { Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

function Brand({ compact = false, to = '/' }) {
  return (
    <Link className="brand-lockup" to={to} aria-label="MedAgenda inicio">
      <span className="brand-icon" aria-hidden="true">
        <Stethoscope size={18} strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="brand-text">
          <strong>MedAgenda</strong>
        </span>
      )}
    </Link>
  );
}

export default Brand;
