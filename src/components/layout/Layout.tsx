import React from 'react';
import type { ReactNode } from 'react';
import styles from './Layout.module.css';
import Starfield from './Starfield';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.appContainer}>
      <nav className={styles.navBar}>
        <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>About</button>
        <button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Skills</button>
        <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className={styles.navLink} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Mission Log</button>
      </nav>
      <Starfield />
      <main className={styles.mainContent}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} CODY WONG // MISSION CONTROL</p>
      </footer>
    </div>
  );
};
