import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
    const links = [
        { name: 'Engineering', path: '/engineering', icon: '[]' },
        { name: 'Research', path: '/research', icon: '{}' },
        { name: 'Art', path: '/art', icon: '<>' },
    ];

    return (
        <div className={styles.navContainer}>
            <h3 className={styles.sectionTitle}>MISSION LOG</h3>
            <nav className={styles.nav}>
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                        }
                    >
                        <span className={styles.icon}>{link.icon}</span>
                        {link.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};
