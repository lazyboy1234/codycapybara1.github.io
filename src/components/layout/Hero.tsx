import React from 'react';
import styles from './Hero.module.css';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.accentDiamond} />

            <h4 className={styles.greeting}>WELCOME, TRAVELER</h4>

            <h1 className={styles.name}>CODY</h1>

            <h2 className={styles.title}>
                Software Engineer, Researcher & 3D Artist
            </h2>

            <p className={styles.bio}>
                High school unicorn bridging CoreML, 3D Design, and Research.
                USACO Silver qualifier, TerraFair award winner, and Roblox creator.
            </p>

            <div className={styles.socials}>
                <a href="https://github.com/codywong" target="_blank" rel="noreferrer" className={styles.iconBtn}>
                    <Github size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.iconBtn}>
                    <Linkedin size={20} />
                </a>
                <a href="mailto:contact@example.com" className={styles.iconBtn}>
                    <Mail size={20} />
                </a>
            </div>

            {/* Decorative Stars */}
            <div className={styles.star} style={{ top: '10%', left: '10%', background: '#8b5cf6' }} />
            <div className={styles.star} style={{ top: '20%', right: '15%', background: '#10b981' }} />
            <div className={styles.star} style={{ bottom: '15%', left: '20%', background: '#f59e0b' }} />
        </section>
    );
};
