'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis();

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        const onLock = () => lenis.stop();
        const onUnlock = () => lenis.start();
        window.addEventListener('lenis:lock', onLock);
        window.addEventListener('lenis:unlock', onUnlock);

        return () => {
            window.removeEventListener('lenis:lock', onLock);
            window.removeEventListener('lenis:unlock', onUnlock);
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, []);

    return children;
}
