'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, name: "78 on Edward", location: 'Cape Town', year: '2022', img: '/projects/BAM-78 on Edward-01.webp', href: null },
    { id: 2, name: 'MTP', location: 'Johannesburg', year: '2021', img: '/projects/BAM-MTP-01.webp', href: null },
    { id: 3, name: 'The Edge', location: 'Tygerfalls', year: '2024', img: '/projects/BAM-The Edge-02.webp', href: '/projects/the-edge' },
    { id: 4, name: 'Panorama Healthcare', location: 'Cape Town', year: '2023', img: '/projects/Panorama Healthcare Building Identity Design.webp', href: null },
    { id: 5, name: 'Residential Estate', location: 'Cape Town', year: '2024', img: '/projects/Residential-Estate.png', href: null },
    { id: 6, name: 'Residential Estate 2', location: 'Cape Town', year: '2024', img: '/projects/Residential-Estate-2.png', href: null },
];

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        gsap.to(track, {
            x: () => -(track.scrollWidth - document.documentElement.clientWidth) + 'px',
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                end: () => `+=${track.scrollWidth - document.documentElement.clientWidth}`,
                invalidateOnRefresh: true,
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.intro}>
                <span className={styles.eyebrow}>Our Projects</span>
                <h2 className={styles.heading}>
                    A Celebration of Innovation, Heritage,<br />
                    and Precision, Reflected in Structures,<br />
                    Spaces, and Details.
                </h2>
            </div>

            <div className={styles.trackContainer}>
                <div ref={trackRef} className={styles.track}>
                    {projects.map((project, i) => {
                        const CardWrapper = project.href
                            ? ({ children }: { children: React.ReactNode }) => <Link href={project.href!} className={styles.card}>{children}</Link>
                            : ({ children }: { children: React.ReactNode }) => <div className={styles.card}>{children}</div>;
                        return (
                            <CardWrapper key={project.id}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.cardIndex}>0{i + 1}</span>
                                    <span className={styles.cardName}>{project.name}</span>
                                    <span className={styles.cardLocation}>{project.location}</span>
                                </div>
                                <div className={styles.cardImage}>
                                    <Image
                                        src={project.img}
                                        alt={project.name}
                                        fill
                                        className={styles.cardImg}
                                        sizes="35vw"
                                    />
                                </div>
                            </CardWrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
