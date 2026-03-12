import Hero from './sections/Hero';
import PinnedTextReveal from './sections/PinnedTextReveal';
import Projects from './sections/Projects';
import About from './sections/About';
import Footer from './sections/Footer';

export default function Home() {
    return (
        <>
            <main style={{ position: 'relative', zIndex: 1, background: '#0a0a0a' }}>
                <Hero />
                <PinnedTextReveal />
                <Projects />
                <About />
            </main>
            {/* Transparent spacer: z-index 1 sits above the fixed footer (z-index 0)
                but has no background, so the footer shows through it as you scroll */}
            <div style={{ height: '70vh', position: 'relative', zIndex: 1 }} />
            <Footer />
        </>
    );
}
