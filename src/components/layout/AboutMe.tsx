import React from 'react';
import styles from './AboutMe.module.css';

export const AboutMe: React.FC = () => {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div className={styles.diamond} />
                <h2 className={styles.heading}>ABOUT ME</h2>
                <div className={styles.line} />
            </div>

            <div className={styles.content}>
                <div className={styles.imageWrapper}>
                    <img
                        src={`${import.meta.env.BASE_URL}images/cody.png`}
                        alt="Cody Wong"
                        className={styles.photo}
                    />
                </div>

                <div className={styles.textWrapper}>
                    <h3 className={styles.name}>I am Cody Wong.</h3>
                    <p className={styles.bio}>
                        I'm a software engineer and 3D artist with a passion for building immersive experiences.
                        Whether it's optimizing CoreML algorithms for wrestling analysis or designing fantasy creatures in Blender,
                        I love bridging the gap between technical engineering and creative design.
                    </p>
                    <p className={styles.bio}>
                        Currently exploring AI agents, Simulation Theory, and Game Development.
                    </p>

                    <a
                        href={`${import.meta.env.BASE_URL}resume/resume.pdf`}
                        download
                        className={styles.resumeBtn}
                    >
                        DOWNLOAD RESUME
                    </a>
                </div>
            </div>
        </section>
    );
};
