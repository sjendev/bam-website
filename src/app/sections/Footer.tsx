'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const topRowRef = useRef<HTMLDivElement>(null);
    const bottomRowRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Trigger animations when the footer spacer (in page.tsx) enters the viewport,
        // which is when the About section scrolls away and the footer is revealed.
        const trigger = document.getElementById('footer-spacer');
        if (!trigger) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: 'top 80%',
            },
        });

        tl.to(topRowRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
        }).to(
            bottomRowRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
            },
            '-=0.4'
        );

        // BAM text drifts in from below as the spacer scrolls into view
        gsap.fromTo(
            bgTextRef.current,
            { y: 80 },
            {
                y: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: 1.5,
                },
            }
        );
    });

    return (
        <footer ref={footerRef} className={styles.footer}>
            {/* Background BAM */}
            <span ref={bgTextRef} className={styles.bgText} aria-hidden="true">
                BAM
            </span>

            {/* Top row */}
            <div ref={topRowRef} className={styles.topRow}>
                <div className={styles.brand}>
                    <img src="/logo.png" alt="BAM Architects" className={styles.brandLogo} />
                </div>

                <nav className={styles.navColumns}>
                    <div className={styles.navColumn}>
                        <span className={styles.navLabel}>Studio</span>
                        <a className={styles.navLink}>About</a>
                        <a className={styles.navLink}>Projects</a>
                        <a className={styles.navLink}>Services</a>
                        <a className={styles.navLink}>Awards</a>
                    </div>
                    <div className={styles.navColumn}>
                        <span className={styles.navLabel}>Connect</span>
                        <a className={styles.navLink}>Instagram</a>
                        <a className={styles.navLink}>LinkedIn</a>
                        <a className={styles.navLink}>Contact</a>
                    </div>
                    <div className={styles.navColumn}>
                        <span className={styles.navLabel}>Contact</span>
                        <a className={styles.navLink}>hello@bamarchitects.co.za</a>
                        <a className={styles.navLink}>+27 (0)21 000 0000</a>
                    </div>
                </nav>
            </div>

            {/* Bottom row */}
            <div ref={bottomRowRef} className={styles.bottomRow}>
                <span className={styles.copyright}>
                    &copy; {new Date().getFullYear()} BAM Architects. All rights reserved.
                </span>
                <span className={styles.location}>Cape Town, South Africa</span>
                <div className={styles.socialLinks}>
                    <a className={styles.socialLink}>Privacy</a>
                    <a className={styles.socialLink}>Terms</a>
                </div>
            </div>
        </footer>
    );
}
