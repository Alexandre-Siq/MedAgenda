import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <HeroSection />
      </main>
      <footer className="footer">
        <span>MedAgenda</span>
        <span>Fundacao inicial do produto</span>
      </footer>
    </div>
  );
}

export default App;
