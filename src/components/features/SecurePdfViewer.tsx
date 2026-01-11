import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './SecurePdfViewer.module.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker locally
// Configure worker locally
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface SecurePdfViewerProps {
    fileUrl: string;
}

export const SecurePdfViewer: React.FC<SecurePdfViewerProps> = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState<number>(0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className={styles.container} onContextMenu={(e) => e.preventDefault()}>
            <div className={styles.watermarkContainer}>
                <div className={styles.watermark}>PREVIEW ONLY • DO NOT DISTRIBUTE</div>
                <div className={styles.watermark} style={{ top: '60%', left: '20%' }}>AUTHOR COPY</div>
            </div>

            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                className={styles.document}
                loading={<div className={styles.loading}>Decrypting Document...</div>}
                error={<div className={styles.error}>Failed to load protected document.</div>}
            >
                {/* Render first 3 pages as preview */}
                {Array.from(new Array(Math.min(numPages, 3)), (_, index) => (
                    <div key={`page_${index + 1}`} className={styles.pageWrapper}>
                        <Page
                            pageNumber={index + 1}
                            className={styles.page}
                            renderTextLayer={false} // Disable text selection for extra security feel
                            width={800} // Base width, resizing handles via CSS
                        />
                    </div>
                ))}
                {numPages > 3 && (
                    <div className={styles.morePages}>+ {numPages - 3} MORE PAGES (LOCKED)</div>
                )}
            </Document>
        </div>
    );
};
