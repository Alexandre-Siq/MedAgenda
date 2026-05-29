function Header() {
  return (
    <header className="header">
      <a className="brand" href="/" aria-label="MedAgenda inicio">
        <span className="brand-mark">M</span>
        <span>MedAgenda</span>
      </a>
      <nav className="nav" aria-label="Navegacao principal">
        <a href="#recursos">Recursos</a>
        <a href="#contato">Contato</a>
      </nav>
    </header>
  );
}

export default Header;
