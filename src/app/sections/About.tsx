import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
    return (
        <section className={styles.aboutSection}>
            {/* Left — Portrait */}
            <div className={styles.imagePane}>
                <Image
                    src="/chris.png"
                    alt="Chris BAM"
                    fill
                    className={styles.portrait}
                    sizes="50vw"
                />
            </div>

            {/* Right — Content */}
            <div className={styles.contentPane}>
                <span className={styles.eyebrow}>About</span>

                <h2 className={styles.name}>Chris<br />BAM</h2>

                <p className={styles.title}>Founder &amp; Principal Architect</p>

                <div className={styles.divider} />

                <p className={styles.bio}>
                    With over three decades of practice, Chris BAM has shaped some of
                    Southern Africa's most distinctive built environments. His philosophy
                    is rooted in the belief that architecture is not merely about buildings
                    — it is about the human experience within them.
                </p>

                <p className={styles.bio}>
                    Founded on the principles of innovation, sustainability, and timeless
                    design, BAM Architects continues to push the boundaries of what is
                    possible — creating spaces that are future ready.
                </p>

                <a href="#" className={styles.contactLink}>
                    Get in touch <span>→</span>
                </a>
            </div>
        </section>
    );
}
