import React, { useState } from 'react';
import type { Project } from '../../data/portfolio';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import styles from './ProjectList.module.css';
import { Code, FileText, Box } from 'lucide-react';

interface ProjectListProps {
    onSelect: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onSelect }) => {
    const [filter, setFilter] = useState<'all' | 'engineering' | 'research' | 'art'>('all');

    const filtered = PORTFOLIO_DATA.filter(p => filter === 'all' || p.category === filter);

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div className={styles.diamond} />
                <h2 className={styles.heading}>PROJECTS</h2>
                <div className={styles.line} />
            </div>

            <div className={styles.filters}>
                <button className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`} onClick={() => setFilter('all')}>
                    All Work
                </button>
                <button className={`${styles.filterBtn} ${filter === 'engineering' ? styles.active : ''}`} onClick={() => setFilter('engineering')}>
                    <Code size={16} /> Engineering
                </button>
                <button className={`${styles.filterBtn} ${filter === 'research' ? styles.active : ''}`} onClick={() => setFilter('research')}>
                    <FileText size={16} /> Research
                </button>
                <button className={`${styles.filterBtn} ${filter === 'art' ? styles.active : ''}`} onClick={() => setFilter('art')}>
                    <Box size={16} /> 3D Art
                </button>
            </div>

            <div className={styles.grid}>
                {filtered.map(project => (
                    <div
                        key={project.id}
                        className={styles.card}
                        onClick={() => onSelect(project)}
                        data-category={project.category}
                    >
                        <div className={styles.cardHeader}>
                            <span className={styles.icon}>
                                {project.category === 'engineering' && <Code size={18} />}
                                {project.category === 'research' && <FileText size={18} />}
                                {project.category === 'art' && <Box size={18} />}
                            </span>
                            <h3 className={styles.cardTitle}>{project.title.toUpperCase()}</h3>
                        </div>

                        <p className={styles.cardDesc}>{project.subtitle}</p>

                        <p className={styles.problem}>
                            {project.problemStatement ? project.problemStatement.slice(0, 100) + '...' : project.techStack.join(' • ')}
                        </p>

                        <div className={styles.techTags}>
                            {project.techStack.slice(0, 3).map(stack => (
                                <span key={stack} className={styles.tag}>{stack}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
