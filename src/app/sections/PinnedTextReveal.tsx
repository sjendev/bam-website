'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PinnedTextReveal = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const text3Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=50%',
                pin: true,
                scrub: 1,
                snap: {
                    snapTo: 'labelsDirectional',
                    duration: { min: 0.2, max: 0.5 },
                    delay: 0.1,
                    ease: 'power1.inOut',
                },
                invalidateOnRefresh: true,
            },
        });

        // Initial state
        gsap.set(text1Ref.current, { opacity: 1 });
        gsap.set([text2Ref.current, text3Ref.current], { opacity: 0 });

        // Timeline steps
        tl.addLabel('text1')
            .to(text1Ref.current, { opacity: 0, duration: 0.2 }, '+=0.1')
            .to(text2Ref.current, { opacity: 1, duration: 0.3 }, '>+0.1')
            .addLabel('text2')
            .to(text2Ref.current, { opacity: 0, duration: 0.2 }, '+=0.1')
            .to(text3Ref.current, { opacity: 1, duration: 0.3 }, '>+0.1')
            .addLabel('text3')
            .to({}, { duration: 0.5 }); // Final hold before unpinning

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-neutral-100 flex items-center justify-center overflow-hidden"
            data-section="pinned-text-reveal"
        >
            <div className="container w-full max-w-[100vw] px-4 md:px-8 mx-auto relative h-full flex flex-col items-center justify-center">
                {/* Text Block 1 */}
                <div
                    ref={text1Ref}
                    className="flex items-center justify-center text-center px-2 md:px-4 w-full"
                >
                    <h2 className="text-neutral-900 text-3xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold uppercase leading-[0.9] tracking-tighter w-full">
                        AT BAM ARCHITECTS WE HAVE <br /> A VISION BEYOND BUILDINGS
                    </h2>
                </div>

                {/* Text Block 2 */}
                <div
                    ref={text2Ref}
                    className="absolute flex items-center justify-center text-center px-2 md:px-4 w-full"
                >
                    <h2 className="text-neutral-900 text-3xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold uppercase leading-[0.9] tracking-tighter w-full">
                        WE ENVISION FUTURES, FUELED BY <br /> PASSION AND DRIVEN BY INNOVATION
                    </h2>
                </div>

                {/* Text Block 3 */}
                <div
                    ref={text3Ref}
                    className="absolute flex items-center justify-center text-center px-2 md:px-4 w-full"
                >
                    <h2 className="text-neutral-900 text-3xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold uppercase leading-[0.9] tracking-tighter w-full">
                        WE CALL IT, FUTURE READY
                    </h2>
                </div>
            </div>

            {/* Scroll arrow */}
            <button
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-neutral-900 border-none flex items-center justify-center animate-bounce cursor-pointer"
                aria-label="Scroll to next section"
                onClick={() => {
                    const next = document.querySelector('[data-section="projects"]') as HTMLElement;
                    const lenis = (window as typeof window & { __lenis?: { scrollTo: (target: HTMLElement, opts?: object) => void } }).__lenis;
                    if (lenis && next) lenis.scrollTo(next);
                    else if (next) next.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4v12M4 10l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </section>
    );
};

export default PinnedTextReveal;
