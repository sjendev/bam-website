import Hero from './sections/Hero';
import PinnedTextReveal from './sections/PinnedTextReveal';
import Projects from './sections/Projects';
import About from './sections/About';
import Footer from './sections/Footer';

export default function Home() {
    return (
        <>
            {/* Sections sit above the fixed footer (z-index: 1 vs footer z-index: 0) */}
            <main style={{ position: 'relative', zIndex: 1 }}>
                <Hero />
                <PinnedTextReveal />
                <Projects />
                <About />
                {/* Spacer creates scroll distance to reveal the fixed footer */}
                <div id="footer-spacer" style={{ height: '70vh' }} />
            </main>
            <Footer />
        </>
    );
}
