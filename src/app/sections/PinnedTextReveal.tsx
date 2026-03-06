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
                end: '+=300%',
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
        gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
            y: 100,
            opacity: 0
        });

        // Timeline steps
        tl.to(text1Ref.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        })
            .addLabel('text1')
            .to(text1Ref.current, {
                opacity: 0,
                y: -50,
                duration: 0.3,
                ease: 'power2.in'
            }, '+=0.5')
            .to(text2Ref.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }, '>+0.4')
            .addLabel('text2')
            .to(text2Ref.current, {
                opacity: 0,
                y: -50,
                duration: 0.3,
                ease: 'power2.in'
            }, '+=0.5')
            .to(text3Ref.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }, '>+0.4')
            .addLabel('text3')
            .to({}, { duration: 1 }); // Final hold before unpinning

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-neutral-100 flex items-center justify-center overflow-hidden"
            data-section="pinned-text-reveal"
        >
            <div className="container px-6 md:px-12 max-w-7xl mx-auto relative h-full flex flex-col items-center justify-center">
                {/* Text Block 1 */}
                <div
                    ref={text1Ref}
                    className="flex items-center justify-center text-center px-4"
                >
                    <h2 className="text-neutral-900 text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.9] tracking-tighter">
                        AT BAM ARCHITECTS WE HAVE <br className="hidden md:block" /> A VISION BEYOND BUILDINGS
                    </h2>
                </div>

                {/* Text Block 2 */}
                <div
                    ref={text2Ref}
                    className="absolute flex items-center justify-center text-center px-4"
                >
                    <h2 className="text-neutral-900 text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.9] tracking-tighter">
                        WE ENVISION FUTURES, FUELED BY PASSION <br className="hidden md:block" /> AND DRIVEN BY INNOVATION
                    </h2>
                </div>

                {/* Text Block 3 */}
                <div
                    ref={text3Ref}
                    className="absolute flex items-center justify-center text-center px-4"
                >
                    <h2 className="text-neutral-900 text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.9] tracking-tighter">
                        WE CALL IT, FUTURE READY
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default PinnedTextReveal;
