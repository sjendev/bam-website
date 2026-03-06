'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
        const entranceTimer = setTimeout(() => {
            setHasEntered(true);
        }, 1000);

        const video = videoRef.current;
        if (!video) return;

        let animationFrameId: number;

        const handleTimeUpdate = () => {
            if (video.duration && video.currentTime > 0) {
                const timeLeft = video.duration - video.currentTime;
                if (timeLeft <= 2.0) {
                    setIsEnding(true);
                }
            }
            animationFrameId = requestAnimationFrame(handleTimeUpdate);
        };

        const preventDefault = (e: Event) => {
            e.preventDefault();
        };

        const preventScrollKeys = (e: KeyboardEvent) => {
            const keys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'];
            if (keys.includes(e.code)) {
                e.preventDefault();
                return false;
            }
        };

        const enableLock = () => {
            document.documentElement.classList.add('no-scroll');
            window.addEventListener('wheel', preventDefault, { passive: false });
            window.addEventListener('touchmove', preventDefault, { passive: false });
            window.addEventListener('keydown', preventScrollKeys, { capture: true });
        };

        const disableLock = () => {
            document.documentElement.classList.remove('no-scroll');
            window.removeEventListener('wheel', preventDefault);
            window.removeEventListener('touchmove', preventDefault);
            window.removeEventListener('keydown', preventScrollKeys, { capture: true });
        };

        const onPlay = () => {
            if (video.ended) return;
            animationFrameId = requestAnimationFrame(handleTimeUpdate);
            enableLock();
        };

        const onPause = () => {
            cancelAnimationFrame(animationFrameId);
        };

        const onEnded = () => {
            disableLock();
            setVideoEnded(true);
            ScrollTrigger.refresh();
        };

        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('ended', onEnded);

        enableLock();

        return () => {
            clearTimeout(entranceTimer);
            cancelAnimationFrame(animationFrameId);
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
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

    const taglineClass = `
        ${styles.tagline}
        ${hasEntered ? styles.entered : ''}
        ${isEnding ? styles.taglineEnding : ''}
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
                    <a href="#" className={styles.navItem}>Projects</a>
                    <a href="#" className={styles.navItem}>Services</a>
                    <a href="#" className={styles.navItem}>Contact</a>
                </nav>

                <div style={{ width: '150px' }}></div>

                <div className={styles.navGroup}>
                    <a href="#" className={styles.navItem}>About</a>
                    <a href="#" className={styles.navItem}>Career</a>
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

                <div className={taglineClass}>
                    <svg
                        viewBox="0 0 600 100"
                        width="100%"
                        height="100%"
                        style={{ overflow: 'visible' }}
                    >
                        <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fill="white"
                            style={{
                                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                fontSize: '48px',
                                letterSpacing: '0.35em',
                                textTransform: 'uppercase'
                            }}
                        >
                            Future Ready
                        </text>
                    </svg>
                </div>
            </div>
        </section>
    );
}
