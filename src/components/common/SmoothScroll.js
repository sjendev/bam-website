'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis();
        window.__lenis = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // When GSAP adds/removes pin spacers it changes page height —
        // tell Lenis to recalculate its scroll limits so it doesn't stop early.
        ScrollTrigger.addEventListener('refresh', () => lenis.resize());
        ScrollTrigger.refresh();

        const onLock = () => lenis.stop();
        const onUnlock = () => lenis.start();
        window.addEventListener('lenis:lock', onLock);
        window.addEventListener('lenis:unlock', onUnlock);

        return () => {
            window.removeEventListener('lenis:lock', onLock);
            window.removeEventListener('lenis:unlock', onUnlock);
            ScrollTrigger.removeEventListener('refresh', () => lenis.resize());
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, []);

    return children;
}
