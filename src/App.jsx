import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Work from './pages/Work';
import Services from './pages/Services';
import ForBrands from './pages/ForBrands';
import ForCreators from './pages/ForCreators';
import About from './pages/About';
import Contact from './pages/Contact';
import CaseStudyDetail from './pages/CaseStudyDetail';

// Import all global styles
import './styles/globals.css';
import './styles/typography.css';
import './styles/animations.css';
import './styles/sections.css';
import './styles/buttons.css';
import './styles/liquid-glass.css';
import './styles/dock-magnification.css';
import { useLiquidGlassDelegated } from './hooks/useLiquidGlass';
import { useGlobalDockMagnification } from './hooks/useDockMagnification';

function App() {
  useLiquidGlassDelegated();
  useGlobalDockMagnification();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Preloader />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudyDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/for-brands" element={<ForBrands />} />
          <Route path="/for-creators" element={<ForCreators />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
