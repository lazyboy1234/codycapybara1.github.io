import React from 'react';
import { motion } from 'framer-motion';
import styles from './StatsPanel.module.css';

interface StatProps {
    label: string;
    value: number;
}

const StatBar: React.FC<StatProps> = ({ label, value }) => (
    <div className={styles.statRow}>
        <div className={styles.statHeader}>
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div className={styles.barContainer}>
            <motion.div
                className={styles.barFill}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
            />
        </div>
    </div>
);

export const StatsPanel: React.FC = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.sectionTitle}>OPERATOR STATS</h3>
            <div className={styles.statsGrid}>
                <StatBar label="Python" value={95} />
                <StatBar label="Swift" value={88} />
                <StatBar label="Blender" value={92} />
            </div>
        </div>
    );
};
