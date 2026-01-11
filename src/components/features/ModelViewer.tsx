import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { STLLoader } from 'three-stdlib';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import * as THREE from 'three';
import styles from './ModelViewer.module.css';

interface ModelProps {
    url?: string;
}

const Model: React.FC<ModelProps> = ({ url }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    // Conditionally load if URL exists, otherwise show placeholder geometry
    const geometry = url ? useLoader(STLLoader, url) : null;

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2; // Slow rotation
        }
    });

    if (!url || !geometry) {
        // Placeholder cube if no model
        return (
            <mesh ref={meshRef}>
                <boxGeometry args={[2, 4, 2]} />
                <meshStandardMaterial
                    color="#f2cc60"
                    wireframe
                    emissive="#f2cc60"
                    emissiveIntensity={0.5}
                />
            </mesh>
        );
    }

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <meshStandardMaterial
                color="#f2cc60"
                metalness={0.8}
                roughness={0.2}
            />
        </mesh>
    );
};

export const ModelViewer: React.FC<{ url?: string; title: string }> = ({ url, title }) => {
    return (
        <div className={styles.container}>
            <div className={styles.canvasWrapper}>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Stage environment="city" intensity={0.5} adjustCamera={false}>
                            <Center>
                                <Model url={url} />
                            </Center>
                        </Stage>
                    </Suspense>
                    <OrbitControls autoRotate={false} />
                </Canvas>
            </div>
            <div className={styles.caption}>
                <span className={styles.icon}>box</span> {title}
            </div>
        </div>
    );
};
