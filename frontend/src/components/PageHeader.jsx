function PageHeader({ breadcrumbs = [], actions }) {
  return (
    <header className="page-header">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        {breadcrumbs.map((item, index) => (
          <span className={index === breadcrumbs.length - 1 ? 'current' : ''} key={item}>
            {item}
          </span>
        ))}
      </nav>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}

export default PageHeader;
