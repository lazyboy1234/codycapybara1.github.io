import React, { useState } from 'react';
import styles from './PaperViewer.module.css';

// We'll use a simple approach: A list of papers, and when clicked, 
// if we want a "viewer", we can use an iframe or <object> to keep it RPG-styled 
// (contained in a panel) rather than full browser navigate.

interface Paper {
    id: string;
    title: string;
    abstract: string;
    filename: string;
}

const PAPERS: Paper[] = [
    {
        id: '1',
        title: 'Research Project 1',
        abstract: 'Abstract for research project 1. Replace this text with your summary.',
        filename: 'project1.pdf' // Place your file in public/papers/project1.pdf
    },
    {
        id: '2',
        title: 'Research Project 2',
        abstract: 'Abstract for research project 2. Replace this text with your summary.',
        filename: 'project2.pdf'
    },
    {
        id: '3',
        title: 'Research Project 3',
        abstract: 'Abstract for research project 3. Replace this text with your summary.',
        filename: 'project3.pdf'
    },
    {
        id: '4',
        title: 'Research Project 4',
        abstract: 'Abstract for research project 4. Replace this text with your summary.',
        filename: 'project4.pdf'
    }
];

export const PaperViewer: React.FC = () => {
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(PAPERS[0]);

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {PAPERS.map((paper) => (
                    <div
                        key={paper.id}
                        className={`${styles.paperItem} ${selectedPaper?.id === paper.id ? styles.active : ''}`}
                        onClick={() => setSelectedPaper(paper)}
                    >
                        <div className={styles.paperTitle}>{paper.title}</div>
                        <div className={styles.paperMeta}>PDF DOCUMENT</div>
                    </div>
                ))}
            </div>

            <div className={styles.preview}>
                {selectedPaper ? (
                    <>
                        <div className={styles.header}>
                            <h2 className={styles.title}>{selectedPaper.title.toUpperCase()}</h2>
                            <div className={styles.divider} />
                        </div>

                        <div className={styles.abstractBox}>
                            <h4 className={styles.abstractTitle}>ABSTRACT</h4>
                            <p className={styles.abstractText}>{selectedPaper.abstract}</p>
                        </div>

                        <div className={styles.documentFrame}>
                            <div className={styles.docHeader}>
                                <span>DOCUMENT PREVIEW</span>
                                <a href={`/papers/${selectedPaper.filename}`} target="_blank" rel="noreferrer" className={styles.downloadBtn}>
                                    READ FULL SCREEN
                                </a>
                            </div>
                            {/* 
                  Using Embed/Object for PDF. 
                  Note: In a real app, 'react-pdf' gives more control, but <object> is native and efficient for simple viewing 
                  without complex worker setup steps that might break in this constrained env.
               */}
                            <object
                                data={`/papers/${selectedPaper.filename}`}
                                type="application/pdf"
                                className={styles.pdfObject}
                            >
                                <div className={styles.fallback}>
                                    <p>No page at /papers/{selectedPaper.filename} detected. You can select a route below.</p>
                                    <ul><li>app<ul><li>page</li></ul></li></ul>
                                </div>
                            </object>
                        </div>
                    </>
                ) : (
                    <div className={styles.placeholder}>SELECT A DOCUMENT FROM THE ARCHIVE</div>
                )}
            </div>
        </div>
    );
};
