'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, name: "Scotchman's", location: 'Cape Town', year: '2022', img: '/slider-1.jpg' },
    { id: 2, name: 'Park House',  location: 'Johannesburg', year: '2021', img: '/slider-2.jpg' },
    { id: 3, name: 'Victoria',    location: 'Cape Town', year: '2023', img: '/slider-1.jpg' },
    { id: 4, name: 'The Meridian',location: 'Durban', year: '2020', img: '/slider-2.jpg' },
    { id: 5, name: 'Horizon Lofts',location: 'Cape Town', year: '2019', img: '/slider-1.jpg' },
    { id: 6, name: 'The Edge',    location: 'Tygerfalls', year: '2024', img: '/slider-2.jpg' },
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
                    {projects.map((project, i) => (
                        <div key={project.id} className={styles.card}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
