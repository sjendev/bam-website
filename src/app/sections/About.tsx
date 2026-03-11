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
                <h2 className={styles.heading}>
                    FOR OVER 30 YEARS WE HAVE SUCCESSFULLY DELIVERED INNOVATIVE SOLUTIONS FOR A WIDE VARIETY OF CLIENTS THROUGHOUT SOUTH AFRICA. NOT ONLY DOES THIS SPEAK VOLUMES ABOUT OUR LONGEVITY, BUT AS WELL AS FOR OUR SUSTAINED ABILITY TO PERFORM CREATIVELY AT THE HIGHEST LEVEL OVER THIS PERIOD.
                </h2>

                <div className={styles.bodyText}>
                    <p>
                        BAM ARCHITECTS ARE DRIVEN BY A PHILOSOPHY OF UNIQUE SOLUTIONS FOR EACH INDIVIDUAL PROJECT, WHICH IS ULTIMATELY CONNECTED TO CONTEXT AND FUNCTION RATHER THAN PRE-DETERMINED STYLISTIC IDEOLOGIES.
                    </p>

                    <p>
                        WE BELIEVE THAT HIGH QUALITY ARCHITECTURE RESULTS FROM THE CONTINUITY OF THE DESIGN PROCESS AND INTENSIVE DIALOGUE WITH THE CLIENT, PROFESSIONAL TEAM, CONTRACTORS AND END-USERS.
                    </p>

                    <p>
                        WE CONTINUOUSLY MAKE THE BUSINESS CASE FOR GOOD DESIGN THROUGH THE BELIEF THAT CREATIVITY SHOULDN&apos;T COST MORE.
                    </p>

                    <p className={styles.signature}>
                        CHRISTIAN BAM - PRINCIPAL
                    </p>

                    <a href="#" className={styles.readMoreBtn}>
                        READ MORE
                    </a>
                </div>
            </div>
        </section>
    );
}
