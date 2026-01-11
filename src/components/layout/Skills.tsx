import React from 'react';
import styles from './Skills.module.css';

export const Skills: React.FC = () => {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div className={styles.diamond} />
                <h2 className={styles.heading}>SKILLS</h2>
                <div className={styles.line} />
            </div>

            <div className={styles.grid}>
                {/* Languages */}
                <div className={styles.col}>
                    <h3 className={styles.colTitle} style={{ color: '#10b981' }}>LANGUAGES</h3>
                    <ul className={styles.list}>
                        <li>Python</li>
                        <li>Swift</li>
                        <li>TypeScript</li>
                        <li>C++</li>
                        <li>Java</li>
                        <li>SQL</li>
                    </ul>
                </div>

                {/* Frameworks */}
                <div className={styles.col}>
                    <h3 className={styles.colTitle} style={{ color: '#3b82f6' }}>FRAMEWORKS</h3>
                    <ul className={styles.list}>
                        <li>React</li>
                        <li>Next.js</li>
                        <li>TensorFlow</li>
                        <li>PyTorch</li>
                        <li>SwiftUI</li>
                        <li>Node.js</li>
                    </ul>
                </div>

                {/* Tools */}
                <div className={styles.col}>
                    <h3 className={styles.colTitle} style={{ color: '#f59e0b' }}>TOOLS</h3>
                    <ul className={styles.list}>
                        <li>Blender</li>
                        <li>Figma</li>
                        <li>Git</li>
                        <li>Docker</li>
                        <li>AWS</li>
                        <li>Firebase</li>
                    </ul>
                </div>

                {/* Interests */}
                <div className={styles.col}>
                    <h3 className={styles.colTitle} style={{ color: '#8b5cf6' }}>INTERESTS</h3>
                    <ul className={styles.list}>
                        <li>Machine Learning</li>
                        <li>iOS Development</li>
                        <li>3D Art</li>
                        <li>Research</li>
                        <li>Game Dev</li>
                    </ul>
                </div>
            </div>

            {/* Decorative Dots */}
            <div className={styles.dot} style={{ top: -20, left: 200, color: '#10b981' }} />
        </section>
    );
};
