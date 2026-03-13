'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Footer from '@/app/sections/Footer';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function TheEdgePage() {
    const galleryRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Reset Lenis (persists across navigations in layout) then native scroll.
        const lenis = (window as typeof window & { __lenis?: { scrollTo: (target: number, opts: object) => void } }).__lenis;
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
        requestAnimationFrame(() => ScrollTrigger.refresh());
        const id = setTimeout(() => ScrollTrigger.refresh(), 300);
        return () => clearTimeout(id);
    }, []);

    useGSAP(() => {
        const containers = gsap.utils.toArray<HTMLElement>(`.${styles.parallaxContainer}`);
        containers.forEach((container) => {
            const img = container.querySelector('img');
            if (!img) return;
            gsap.fromTo(img,
                { y: '-12%' },
                {
                    y: '12%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        });
    }, { scope: galleryRef });

    return (
        <>
        <main className={styles.main} style={{ position: 'relative', zIndex: 1 }}>

            {/* ─── Full-Screen Hero ─── */}
            <section className={styles.hero}>
                <Image
                    src="/projects/BAM-The Edge-02.webp"
                    alt="The Edge – Tygerfalls"
                    fill
                    className={styles.heroImage}
                    priority
                    sizes="100vw"
                />
                <div className={styles.overlay} />

                {/* Header */}
                <header className={styles.header}>
                    <nav className={styles.navGroup}>
                        <Link href="/" className={styles.navItem}>Home</Link>
                        <Link href="/#projects" className={styles.navItem}>Projects</Link>
                    </nav>

                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="BAM Architects"
                            width={160}
                            height={80}
                            className={styles.logo}
                        />
                    </Link>

                    <nav className={styles.navGroup}>
                        <a href="#" className={styles.navItem}>Media</a>
                        <a href="#" className={styles.navItem}>Contact</a>
                        <button className={styles.letsTalkBtn}>
                            Let's Talk <span className={styles.plus}>+</span>
                        </button>
                    </nav>
                </header>

                {/* Bottom bar */}
                <div className={styles.heroBottom}>
                    <div className={styles.projectMeta}>
                        <span className={styles.projectName}>The Edge</span>
                        <span className={styles.divider} />
                        <span className={styles.metaItem}>Tygerfalls, Cape Town</span>
                    </div>
                    <div className={styles.scrollHint}>
                        <span>Scroll</span>
                        <span className={styles.scrollLine} />
                    </div>
                </div>
            </section>

            {/* ─── Project Details ─── */}
            <section className={styles.details}>
                <div className={styles.detailsGrid}>
                    <div className={styles.detailsLeft}>
                        <span className={styles.label}>Project</span>
                        <h1 className={styles.title}>The Edge</h1>
                    </div>
                    <div className={styles.detailsRight}>
                        <div className={styles.spec}>
                            <span className={styles.specLabel}>Location</span>
                            <span className={styles.specValue}>Tygerfalls, Cape Town</span>
                        </div>
                        <div className={styles.spec}>
                            <span className={styles.specLabel}>Year</span>
                            <span className={styles.specValue}>2024</span>
                        </div>
                        <div className={styles.spec}>
                            <span className={styles.specLabel}>Typology</span>
                            <span className={styles.specValue}>Commercial</span>
                        </div>
                        <div className={styles.spec}>
                            <span className={styles.specLabel}>Status</span>
                            <span className={styles.specValue}>Completed</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Gallery ─── */}
            <section ref={galleryRef} className={styles.gallery}>

                {/* Full-width */}
                <div className={styles.imgFull}>
                    <div className={styles.parallaxContainer}>
                        <Image
                            src="/projects/edge-01.png"
                            alt="The Edge – exterior"
                            fill
                            className={styles.galleryImg}
                            sizes="100vw"
                        />
                    </div>
                </div>

                {/* Two-column */}
                <div className={styles.imgRow}>
                    <div className={styles.imgHalf}>
                        <div className={styles.parallaxContainer}>
                            <Image
                                src="/projects/edge-02.png"
                                alt="The Edge – detail"
                                fill
                                className={styles.galleryImg}
                                sizes="50vw"
                            />
                        </div>
                    </div>
                    <div className={styles.imgHalf}>
                        <div className={styles.parallaxContainer}>
                            <Image
                                src="/projects/edge-03.png"
                                alt="The Edge – facade"
                                fill
                                className={styles.galleryImg}
                                sizes="50vw"
                            />
                        </div>
                    </div>
                </div>

                {/* Full-width */}
                <div className={styles.imgFull}>
                    <div className={styles.parallaxContainer}>
                        <Image
                            src="/projects/edge-04.png"
                            alt="The Edge – landscape"
                            fill
                            className={styles.galleryImg}
                            sizes="100vw"
                        />
                    </div>
                </div>

            </section>

            {/* ─── Back to projects ─── */}
            <div className={styles.backRow}>
                <Link href="/#projects" className={styles.backLink}>
                    ← All Projects
                </Link>
            </div>

        </main>
        <div style={{ height: '70vh', position: 'relative', zIndex: 1 }} />
        <Footer />
        </>
    );
}
