import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import styles from './Demos.module.css';

// Step Logic
const STEPS = [
    { id: 0, label: "STEP 1: RECOGNITION", sub: "Agent identifies interactive object (Door)" },
    { id: 1, label: "STEP 2: GAZE FIXATION", sub: "Dwell timer activates on object focus (2.0s)" },
    { id: 2, label: "STEP 3: ACTION TRIGGER", sub: "Threshold reached. Interaction event fired." }
];

const GazeCursor: React.FC<{ progress: number, active: boolean }> = ({ progress, active }) => {
    return (
        <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40px', height: '40px',
            borderRadius: '50%',
            border: `2px solid ${active ? 'lime' : 'rgba(255,255,255,0.2)'}`,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            transition: 'all 0.3s'
        }}>
            <div style={{
                width: '6px', height: '6px',
                background: active ? 'lime' : 'rgba(255,255,255,0.5)',
                borderRadius: '50%'
            }} />
            {active && (
                <svg style={{ position: 'absolute', top: -2, left: -2, width: 44, height: 44, transform: 'rotate(-90deg)' }}>
                    <circle
                        cx="22" cy="22" r="20"
                        fill="none"
                        stroke="lime"
                        strokeWidth="4"
                        strokeDasharray="125"
                        strokeDashoffset={125 - (125 * progress)}
                        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                    />
                </svg>
            )}
        </div>
    );
};

// Door Mesh (controlled by props only, no mouse interaction)
const AutoDoor: React.FC<{
    isOpen: boolean,
    isHighlighted: boolean
}> = ({ isOpen, isHighlighted }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (groupRef.current) {
            const targetRot = isOpen ? Math.PI / 2 : 0;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot, delta * 2.0);
        }
    });

    return (
        <group position={[0.5, -1, 0]}>
            <group ref={groupRef} position={[-0.5, 0, 0]}>
                <mesh position={[0.5, 1, 0]}>
                    <boxGeometry args={[1, 2, 0.1]} />
                    <meshStandardMaterial color={isHighlighted ? "#8B4513" : "#5c4033"} />
                </mesh>
                <mesh position={[0.9, 1, 0.06]}>
                    <sphereGeometry args={[0.08]} />
                    <meshStandardMaterial
                        color={isHighlighted ? "orange" : "gold"}
                        emissive={isHighlighted ? "orange" : "black"}
                        emissiveIntensity={isHighlighted ? 0.5 : 0}
                    />
                </mesh>
            </group>
        </group>
    );
};

// Hand Mesh that raises up
const AgentHand: React.FC<{ isRaising: boolean }> = ({ isRaising }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((_, delta) => {
        if (groupRef.current) {
            const targetY = isRaising ? 0 : -2;
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 3);
        }
    });

    return (
        <group ref={groupRef} position={[0.5, -2, 1.5]} rotation={[-0.5, 0, 0]}>
            {/* Arm */}
            <mesh position={[0, -1, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 2]} />
                <meshStandardMaterial color="#4488ff" />
            </mesh>
            {/* Hand */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.3, 0.4, 0.1]} />
                <meshStandardMaterial color="#4488ff" />
            </mesh>
        </group>
    );
};

export const OpenDoorDemo: React.FC = () => {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);

    // Animation Sequencer
    useEffect(() => {

        const runSequence = async () => {
            // STEP 1: Identify (1s)
            setStep(0); setProgress(0);
            await new Promise(r => setTimeout(r, 1500));

            // STEP 2: Gaze Fill (2s)
            setStep(1);
            const duration = 2000;
            const start = Date.now();
            while (Date.now() - start < duration) {
                setProgress(Math.min(1, (Date.now() - start) / duration));
                await new Promise(r => requestAnimationFrame(r));
            }
            setProgress(1);

            // STEP 3: Action (Hand Raise + Open) (2s)
            setStep(2);
            await new Promise(r => setTimeout(r, 2000));

            // Reset
            runSequence();
        };

        runSequence();
        return () => { };
    }, []);

    const isOpen = step === 2;
    const isActive = step >= 1;
    // Hand raises only during action phase (step 2)
    const isHandRaised = step === 2;

    return (
        <div className={styles.demoContainer} style={{ flexDirection: 'column', gap: 0 }}>
            <h4 className={styles.demoTitle} style={{ border: 'none' }}>
                UNITY CLASSROOM SIMULATION: GAZE MECHANIC
            </h4>

            <div className={styles.vizPanel} style={{ height: '500px', background: '#111', position: 'relative', width: '100%' }}>
                <GazeCursor progress={progress} active={isActive} />

                {/* Step Indicator Overlay */}
                <div style={{
                    position: 'absolute', top: 20, left: 20,
                    zIndex: 10, background: 'rgba(0,0,0,0.8)',
                    padding: '1rem', borderLeft: '4px solid lime'
                }}>
                    <div style={{ color: 'lime', fontWeight: 'bold', marginBottom: '4px' }}>
                        {STEPS[step].label}
                    </div>
                    <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                        {STEPS[step].sub}
                    </div>
                </div>

                <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <gridHelper args={[10, 10, 0x444444, 0x222222]} />
                    <AutoDoor isOpen={isOpen} isHighlighted={isActive} />
                    <AgentHand isRaising={isHandRaised} />
                    {/* LOCKED CAMERA: No Zoom, No Rotate, No Pan */}
                    <OrbitControls
                        enableZoom={false}
                        enableRotate={false}
                        enablePan={false}
                    />
                </Canvas>
            </div>
        </div>
    );
};
