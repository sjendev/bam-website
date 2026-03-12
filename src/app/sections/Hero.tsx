'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
}

const sliderImages = [
    { src: '/slider-1.jpg', alt: 'BAM Architects Project 1' },
    { src: '/slider-2.jpg', alt: 'BAM Architects Project 2' },
];
// slide 0 = video end frame (no overlay), 1 = slider-1.jpg, 2 = slider-2.jpg
const TOTAL_SLIDES = sliderImages.length + 1;

const slideData = [
    { building: 'The Edge Building', location: 'Tygerfalls, Cape Town' },
    { building: 'Glacier Place', location: 'Cape Town' },
    { building: 'BAM Project', location: 'South Africa' },
];

export default function Hero() {
    const videoRef = useRef(null);
    const [hasEntered, setHasEntered] = useState(false);
    const [isEnding, setIsEnding] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Disable browser scroll restoration so refresh always starts at top
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        const entranceTimer = setTimeout(() => {
            setHasEntered(true);
        }, 1000);

        const video = videoRef.current;
        if (!video) return;

        const enableLock = () => {
            window.dispatchEvent(new Event('lenis:lock'));
        };

        const disableLock = () => {
            window.dispatchEvent(new Event('lenis:unlock'));
        };

        // Native timeupdate fires while playing — unaffected by pause/resume cycles.
        // Remove itself once isEnding is set to avoid repeated state updates.
        const onTimeUpdate = () => {
            if (video.duration && video.currentTime > 0) {
                const timeLeft = video.duration - video.currentTime;
                if (timeLeft <= 2.0) {
                    setIsEnding(true);
                    disableLock();    // Unlock scroll as soon as header appears
                    video.removeEventListener('timeupdate', onTimeUpdate);
                }
            }
        };

        const onEnded = () => {
            setIsEnding(true);  // Fallback: ensure exit animation fires
            disableLock();      // Fallback: ensure scroll unlocked
            setVideoEnded(true);
        };

        video.addEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('ended', onEnded);

        // Defer so SmoothScroll's useEffect (ancestor) has time to register
        // the lenis:lock listener before we dispatch it.
        const lockTimer = setTimeout(enableLock, 100);

        return () => {
            clearTimeout(entranceTimer);
            clearTimeout(lockTimer);
            video.removeEventListener('timeupdate', onTimeUpdate);
            video.removeEventListener('ended', onEnded);
            disableLock();
        };
    }, []);

    // Auto-advance: each slide (including the video frame at 0) holds for 5s
    useEffect(() => {
        if (!videoEnded) return;
        const timer = setTimeout(() => {
            setCurrentSlide(prev => (prev + 1) % TOTAL_SLIDES);
        }, 6000);
        return () => clearTimeout(timer);
    }, [currentSlide, videoEnded]);

    const logoClass = `
        ${styles.logo}
        ${hasEntered ? styles.entered : ''}
        ${isEnding ? styles.logoEnding : ''}
    `.trim();

    const wordClass = `
        ${styles.taglineWord}
        ${hasEntered ? styles.taglineWordEntered : ''}
        ${isEnding ? styles.taglineWordEnding : ''}
    `.trim();

    return (
        <section className={styles.heroContainer}>
            <div className={styles.videoWrapper}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className={styles.heroVideo}
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Image Slider — slide 0 shows nothing (video shows through), 1+ shows images */}
            <div className={`${styles.sliderWrapper} ${videoEnded ? styles.sliderVisible : ''}`}>
                {sliderImages.map((slide, i) => (
                    <Image
                        key={slide.src}
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className={`${styles.slide} ${(i + 1) === currentSlide ? styles.slideActive : ''}`}
                        sizes="100vw"
                        priority={i === 0}
                    />
                ))}
            </div>

            <div className={styles.heroOverlay}></div>

            <header className={`${styles.headerContainer} ${isEnding ? styles.headerVisible : ''}`}>
                <nav className={styles.navGroup}>
                    <a href="#" className={styles.navItem}>Home</a>
                    <a href="#" className={styles.navItem}>Projects</a>
                </nav>

                <div style={{ width: '150px' }}></div>

                <div className={styles.navGroup}>
                    <a href="#" className={styles.navItem}>Media</a>
                    <a href="#" className={styles.navItem}>Contact</a>
                    <button className={styles.letsTalkBtn}>
                        Let's Talk <span className={styles.plusIcon}>+</span>
                    </button>
                </div>
            </header>

            <div className={`${styles.bottomInfoContainer} ${isEnding ? styles.bottomVisible : ''}`}>
                <div key={currentSlide} className={styles.projectMeta}>
                    <span>{slideData[currentSlide].building}</span>
                    <span>{slideData[currentSlide].location}</span>
                </div>
                <button className={styles.viewProjectBtn}>View Project</button>
            </div>


            <div className={styles.heroContent}>
                <Image
                    src="/logo.png"
                    alt="BAM Architects Logo"
                    width={800}
                    height={400}
                    className={logoClass}
                    priority
                />

                <div className={styles.tagline}>
                    <span className={wordClass}>Future</span>
                    <span className={wordClass}>Ready</span>
                </div>
            </div>
        </section>
    );
}
