import Hero from './sections/Hero'
import PinnedTextReveal from './sections/PinnedTextReveal'
import Projects from './sections/Projects'
import About from './sections/About'

export default function Home() {
    return (
        <main>
            <Hero />
            <PinnedTextReveal />
            <Projects />
            <About />
        </main>
    )
}
