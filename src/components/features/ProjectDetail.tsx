import React from 'react';
import type { Project, MediaItem } from '../../data/portfolio';
import styles from './ProjectDetail.module.css';
import { Github, ExternalLink, Award } from 'lucide-react';
import { SecurePdfViewer } from './SecurePdfViewer';

interface ProjectDetailProps {
    project: Project;
    onBack: () => void;
}

const MediaRenderer: React.FC<{ item: MediaItem }> = ({ item }) => {
    switch (item.type) {
        case 'video':
            return (
                <div className={styles.mediaWrapper}>
                    <video
                        src={item.url}
                        controls
                        playsInline // Critical for iPhone
                        webkit-playsinline="true" // Legacy iOS
                        className={styles.mediaContent}
                        poster="/videos/placeholder_poster.png"
                    />
                </div>
            );
        case 'youtube':
            return (
                <div className={styles.mediaWrapper}>
                    <iframe
                        width="100%"
                        height="350"
                        src={item.url}
                        title={item.caption || "Video"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={styles.mediaContent}
                        style={{ height: '350px' }} // Match other media
                    />
                </div>
            );
        case 'image':
            return (
                <div
                    className={`${styles.mediaWrapper} ${item.rotation ? styles.rotated : ''}`}
                    style={item.rotation ? { minHeight: '500px' } : undefined} // Force space for rotated vertical images
                >
                    <img
                        src={item.url}
                        alt={item.caption}
                        className={styles.mediaContent}
                        style={item.rotation ? { transform: `rotate(${item.rotation}deg)` } : undefined}
                    />
                </div>
            );
        case 'pdf':
            // UPDATED: Use SecurePdfViewer
            return (
                <div className={styles.pdfContainer}>
                    <SecurePdfViewer fileUrl={item.url || ''} />
                </div>
            );
        case 'component':
            return <div className={styles.componentWrapper}>{item.component}</div>;
        case 'sketchfab':
            return (
                <div className={styles.sketchfabWrapper}>
                    <iframe
                        title="Sketchfab Model"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        src={`https://sketchfab.com/models/${item.url}/embed`}
                        className={styles.sketchfabFrame}
                    />
                </div>
            );
        default:
            return null;
    }
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <button onClick={onBack} className={styles.backBtn}>&larr; BACK TO MISSION LIST</button>

                <div className={styles.contentGrid}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{project.title.toUpperCase()}</h1>
                        <h3 className={styles.subtitle}>{project.subtitle}</h3>

                        <div className={styles.stack}>
                            {project.techStack.map(stack => (
                                <span key={stack} className={styles.badge}>{stack}</span>
                            ))}
                        </div>

                        {project.problemStatement && (
                            <section className={styles.section}>
                                <h4 className={styles.sectionTitle}>THE MISSION (Problem)</h4>
                                <p>{project.problemStatement}</p>
                            </section>
                        )}

                        {project.solution && (
                            <section className={styles.section}>
                                <h4 className={styles.sectionTitle}>EXECUTION (Solution)</h4>
                                <p>{project.solution}</p>
                            </section>
                        )}

                        {project.whatILearned && (
                            <section className={styles.section}>
                                <h4 className={styles.sectionTitle}>INTEL GAINED (Learnings)</h4>
                                <ul className={styles.list}>
                                    {project.whatILearned.map((learn, i) => (
                                        <li key={i}>{learn}</li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {project.awards && (
                            <div className={styles.awardsBox}>
                                {project.awards.map((award, i) => (
                                    <div key={i} className={styles.awardRow}>
                                        <Award size={18} color="var(--color-accent)" />
                                        <span>{award}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* External Links */}
                        <div className={styles.actions}>
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.actionBtn}>
                                    <Github size={18} /> GITHUB REPO
                                </a>
                            )}
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.actionBtn}>
                                    <ExternalLink size={18} /> LIVE SYSTEM
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Visual Assets */}
                    <div className={styles.mediaCol}>
                        {/* Hero Asset */}
                        <div className={styles.heroMedia}>
                            <MediaRenderer item={project.heroMedia} />
                            {project.heroMedia.caption && <div className={styles.caption}>{project.heroMedia.caption}</div>}
                        </div>

                        {/* Additional Gallery Grid */}
                        {project.gallery && (
                            <div className={styles.galleryGrid}>
                                {project.gallery.map((item, i) => (
                                    <div key={i} className={styles.galleryItem}>
                                        <MediaRenderer item={item} />
                                        {item.caption && <div className={styles.galleryCaption}>{item.caption}</div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
