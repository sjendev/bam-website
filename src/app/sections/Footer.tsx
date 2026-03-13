'use client';

import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Background BAM */}
            <span className={styles.bgText} aria-hidden="true">
                BAM
            </span>

            {/* Top row */}
            <div className={styles.topRow}>
                <div className={styles.brand}>
                    <img src="/logo.png" alt="BAM Architects" className={styles.brandLogo} />
                </div>

                <nav className={styles.navColumns}>
                    <div className={styles.navColumn}>
                        <span className={styles.navLabel}>Studio</span>
                        <a className={styles.navLink}>About</a>
                        <a className={styles.navLink}>Projects</a>
                        <a className={styles.navLink}>Media</a>
                        <a className={styles.navLink}>Contact</a>
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
            <div className={styles.bottomRow}>
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
