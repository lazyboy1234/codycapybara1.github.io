import React from 'react';
import styles from './AppShowcase.module.css';

interface AppDemoProps {
    title: string;
    description: string;
    videoUrl?: string; // We can use video or image
    techStack: string[];
}

const AppCard: React.FC<AppDemoProps> = ({ title, description, videoUrl, techStack }) => (
    <div className={styles.card}>
        <div className={styles.phoneFrame}>
            <div className={styles.notch} />
            <div className={styles.screen}>
                {videoUrl ? (
                    <video src={videoUrl} loop muted autoPlay playsInline className={styles.media} />
                ) : (
                    <div className={styles.placeholder}>
                        <span className={styles.icon}>📱</span>
                        <p>Video placeholder for {title}</p>
                        <small>Add videoUrl to display</small>
                    </div>
                )}
            </div>
        </div>
        <div className={styles.info}>
            <h3 className={styles.appTitle}>{title}</h3>
            <p className={styles.appDesc}>{description}</p>
            <div className={styles.stack}>
                {techStack.map(tech => (
                    <span key={tech} className={styles.tag}>{tech}</span>
                ))}
            </div>
        </div>
    </div>
);

export const AppShowcase: React.FC = () => {
    return (
        <div className={styles.container}>
            <AppCard
                title="Wrestling Analyst"
                description="AI-powered wrestling match analysis tool used by varsity teams. Tracks moves, points, and generates heatmaps."
                techStack={['Swift', 'CoreML', 'Vision']}
                videoUrl="/videos/wrestling_demo.mp4" // Example: Place file in public/videos/wrestling_demo.mp4
            />
            <AppCard
                title="Security System"
                description="Raspberry Pi-based home security system with motion detection. Features custom Python backend and React dashboard."
                techStack={['Python', 'Flask', 'React', 'Pi']}
            // Add videoUrl="/videos/security.mp4" here when you have the file
            />
        </div>
    );
};
