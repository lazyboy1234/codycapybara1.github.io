import React, { useEffect, useRef } from 'react';
import styles from './Demos.module.css';

// --- MICROPHONE DEMO ---

export const MicrophoneDemo: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frameId = 0;
        const mics = [{ x: 100, y: 300 }, { x: 300, y: 300 }, { x: 200, y: 150 }];
        const source = { x: 200, y: 200 }; // Initial roughly center

        const draw = (time: number) => {
            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Move source slightly
            source.x = 200 + Math.sin(time * 0.001) * 50;
            source.y = 200 + Math.cos(time * 0.0013) * 30;

            // Draw Mics
            mics.forEach((mic, i) => {
                ctx.beginPath();
                ctx.arc(mic.x, mic.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = '#f2cc60';
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.fillText(`MIC ${i + 1}`, mic.x - 15, mic.y + 20);
            });

            // Draw Source
            ctx.beginPath();
            ctx.arc(source.x, source.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#ff4444';
            ctx.fill();
            ctx.fillText('SOURCE', source.x - 20, source.y - 15);

            // Draw Triangulation Lines
            ctx.strokeStyle = 'rgba(242, 204, 96, 0.3)';
            ctx.setLineDash([5, 5]);
            mics.forEach(mic => {
                ctx.beginPath();
                ctx.moveTo(mic.x, mic.y);
                ctx.lineTo(source.x, source.y);
                ctx.stroke();
            });
            ctx.setLineDash([]);

            // Draw Waves
            mics.forEach(mic => {
                const dist = Math.sqrt((mic.x - source.x) ** 2 + (mic.y - source.y) ** 2);
                const phase = (time * 0.05) % 20; // propagation speed

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.beginPath();
                ctx.arc(source.x, source.y, dist - phase, 0, Math.PI * 2); // Reverse wave visual
                // Actually better: circles emanating from source
            });

            // Draw Waves from Source
            for (let i = 0; i < 5; i++) {
                const r = ((time * 0.1) + (i * 40)) % 300;
                ctx.strokeStyle = `rgba(255, 68, 68, ${1 - r / 300})`;
                ctx.beginPath();
                ctx.arc(source.x, source.y, r, 0, Math.PI * 2);
                ctx.stroke();
            }

            frameId = requestAnimationFrame(draw);
        };

        frameId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className={styles.demoContainer}>
            <div className={styles.vizPanel}>
                <h4 className={styles.demoTitle}>TDOA TRIANGULATION VISUALIZER</h4>
                <canvas ref={canvasRef} width={400} height={400} className={styles.canvas} />
                <div className={styles.legend}>
                    <span style={{ color: '#f2cc60' }}>● MICROPHONES</span>
                    <span style={{ color: '#ff4444' }}>● SIGNAL SOURCE</span>
                </div>
            </div>

            <div className={styles.chartPanel}>
                <h4 className={styles.demoTitle}>SYSTEM COST ANALYSIS</h4>
                {/* Cost Savings Bar Chart (CSS) */}
                <div className={styles.barChart}>
                    <div className={styles.barRow}>
                        <span className={styles.barLabel}>Standard Array</span>
                        <div className={styles.barTrack}>
                            <div className={styles.barFill} style={{ width: '90%', background: '#ff6666' }}>
                                $450.00
                            </div>
                        </div>
                    </div>
                    <div className={styles.barRow}>
                        <span className={styles.barLabel}>Our Optimized</span>
                        <div className={styles.barTrack}>
                            <div className={styles.barFill} style={{ width: '45%', background: '#66ff66' }}>
                                $225.00
                            </div>
                        </div>
                    </div>
                </div>
                <p className={styles.costNote}>50% Cost Reduction verified in paper Table 2.</p>
            </div>
        </div>
    );
};
