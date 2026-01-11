import React from 'react';
import { MicrophoneDemo } from '../components/features/MicrophoneDemo';
import { OpenDoorDemo } from '../components/features/OpenDoorDemo';

// Types representing the diverse content
export type MediaType = 'video' | 'image' | 'pdf' | 'sketchfab' | 'component' | 'youtube';

export interface MediaItem {
    type: MediaType;
    url?: string;
    caption?: string;
    rotation?: number; // Degrees
    component?: React.ReactNode;
}

export interface Project {
    id: string;
    category: 'engineering' | 'research' | 'art';
    title: string;
    subtitle: string;
    problemStatement?: string;
    solution?: string;
    techStack: string[];
    whatILearned?: string[];
    awards?: string[];
    githubUrl?: string;
    liveUrl?: string;
    heroMedia: MediaItem;
    gallery?: MediaItem[];
}

const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const u = (path: string) => `${BASE}${path.startsWith('/') ? path.slice(1) : path}`;

export const PORTFOLIO_DATA: Project[] = [
    // --- ENGINEERING ---
    // --- ENGINEERING ---
    {
        id: 'wrestling-app',
        category: 'engineering',
        title: 'Wrestling Trainer AI',
        subtitle: 'CoreML Stance & Motion Coach',
        problemStatement: 'Wrestlers need reaction-based drilling ("Shot, Downblock, Sprawl") but can\'t always train with a partner calling commands. High-level matches also move too fast to manually track statistics.',
        solution: 'I trained a Custom CoreML model on ~300 clips (YouTube + Self-recorded) to recognize wrestling stances. The app shouts commands in my voice, tracks your movement via camera, and increments your score only when you execute the correct move instantly.',
        techStack: ['Swift', 'CoreML', 'AVFoundation', 'Pose Estimation'],
        whatILearned: ['ML Model Training (CreateML)', 'Real-time Camera Feed Processing', 'Voice Synthesis Integration'],
        githubUrl: 'https://github.com/codywong/wrestling-ai',
        heroMedia: {
            type: 'image',
            url: u('images/wrestling/banner_noebius.png'), // Using placeholder
            caption: 'Real-time Dashboard',
            rotation: 90
        },
        gallery: [
            { type: 'image', url: u('images/wrestling/pose_lunges.png'), caption: 'Shot Detection (Real-Time)' },
            { type: 'image', url: u('images/wrestling/pose_kneel.png'), caption: 'Low Level Attack Recognition' },
            // Video at the bottom as requested
            { type: 'video', url: u('videos/wrestling_demo.mp4'), caption: 'Live Project Demo', rotation: 90 }
        ]
    },
    {
        id: 'security-system',
        category: 'engineering',
        title: 'Pi Sentry',
        subtitle: 'IoT Home Security',
        problemStatement: 'Commercial security systems are expensive and lack customizable data ownership.',
        solution: 'Built a custom Raspberry Pi security node with motion detection, local storage, and real-time React dashboard.',
        techStack: ['Python', 'Flask', 'React', 'Raspberry Pi', 'OpenCV'],
        whatILearned: ['IoT hardware integration', 'Websocket real-time communication'],
        githubUrl: 'https://github.com/codywong/pi-sentry',
        heroMedia: {
            type: 'image',
            url: u('/videos/placeholder_security.png'),
            caption: 'Dashboard View'
        }
    },
    {
        id: 'easy-flow',
        category: 'engineering',
        title: 'Easy Flow',
        subtitle: 'Intelligent Productivity Suite',
        problemStatement: 'Students struggle to balance fixed schedules (classes), variable tasks (study), and rest, leading to burnout.',
        solution: 'Built a comprehensive iOS app that conducts a "Busy Period" survey, sets goals, and auto-schedules tasks around existing commitments. Includes a built-in Pomodoro timer for execution.',
        techStack: ['Swift', 'SwiftUI', 'CoreData', 'Algorithms'],
        whatILearned: ['Complex Scheduling Algorithms', 'iOS State Management', 'User Onboarding Flows'],
        githubUrl: 'https://github.com/codywong/easy-flow',
        heroMedia: {
            type: 'youtube',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1', // Auto-roll
            caption: 'App Demo (External Host)'
        },
        gallery: [
            { type: 'image', url: u('images/easyflow/calendar.png'), caption: 'Calendar & Tasks' },
            { type: 'image', url: u('images/easyflow/survey.png'), caption: 'Smart Onboarding' },
            { type: 'image', url: u('images/easyflow/timer.png'), caption: 'Focus Timer' },
            { type: 'image', url: u('images/easyflow/profile.png'), caption: 'Analytics Dashboard' }
        ]
    },
    {
        id: 'metro-controller',
        category: 'engineering',
        title: 'Metro Card Controller',
        subtitle: 'Physical Computing Interface',
        problemStatement: 'Wanted to explore Human-Computer Interaction (HCI) beyond standard mouse/keyboard inputs using everyday objects.',
        solution: 'Developed a computer vision system that tracks the specific green hue of a Metro Card. By moving the card physically, I controlled a digital dummy\'s movement on screen, translating real-world coordinates to virtual actions.',
        techStack: ['Python', 'OpenCV', 'Color Thresholding'],
        whatILearned: ['HSV Color Space Calibration', 'Real-time Object Tracking', 'HCI Design Patterns'],
        heroMedia: {
            type: 'video',
            url: u('videos/metro_demo.mp4'),
            caption: 'Green Card Tracking Demo'
        }
    },
    {
        id: 'crime-detection',
        category: 'engineering',
        title: 'Crime & Face Detection',
        subtitle: 'Automated Surveillance Logic',
        problemStatement: 'Security systems often record passively without identifying individuals in critical zones.',
        solution: 'Implemented a face detection pipeline using Python and OpenCV to identify subjects in video streams, intended for a larger crime detection project.',
        techStack: ['Python', 'OpenCV', 'Face_recognition', 'NumPy'],
        whatILearned: ['Biometric Data Processing', 'Privacy & Ethics in AI'],
        heroMedia: {
            type: 'image',
            url: u('images/face_detect_placeholder.png'),
            caption: 'Face Detection Pipeline'
        }
    },

    // --- RESEARCH ---
    {
        id: 'microphone-part',
        category: 'research',
        title: 'Microphone Array Optimization',
        subtitle: 'Signal Processing Research',
        problemStatement: 'Standard microphone arrays struggle with noise cancellation in high-reverb environments.',
        solution: 'Researched and implemented a new beamforming algorithm that improves signal-to-noise ratio by 15%.',
        techStack: ['Python', 'NumPy', 'Signal Processing', 'C++'],
        whatILearned: ['Advanced FFT techniques', 'Academic writing standards'],
        heroMedia: {
            type: 'component',
            component: <MicrophoneDemo />,
            caption: 'TDOA Visualization & Cost Analysis'
        },
        gallery: [
            { type: 'image', url: u('/papers/mic_setup.png'), caption: 'Hardware Setup' },
            { type: 'pdf', url: u('/papers/project1.pdf'), caption: 'Full Paper (Preview)' }
        ]
    },
    {
        id: 'open-door',
        category: 'research',
        title: 'Open Door Learning',
        subtitle: 'Reinforcement Learning Study',
        problemStatement: 'Robotic agents often fail to generalize door-opening tasks across different door handle types.',
        solution: 'Proposed a meta-learning framework that enables agents to adapt to new door mechanics with few-shot learning.',
        techStack: ['Python', 'PyTorch', 'MuJoCo'],
        whatILearned: ['Reinforcement Learning policies', 'Simulation-to-Real transfer'],
        heroMedia: {
            type: 'component',
            component: <OpenDoorDemo />,
            caption: 'Agent Policy Simulation'
        },
        gallery: [
            { type: 'pdf', url: u('/papers/project2.pdf'), caption: 'Research Paper' }
        ]
    },
    {
        id: 'mouse-behavioral',
        category: 'research',
        title: 'Mouse Behavioral Analysis',
        subtitle: 'Computational Biology',
        problemStatement: 'Manual tracking of mouse behavior in lab settings is prone to error and time-consuming.',
        solution: 'Created an automated tracking pipeline using deep learning to classify social behaviors in mice videos.',
        techStack: ['Python', 'DeepLabCut', 'TensorFlow'],
        githubUrl: 'https://github.com/codywong/mouse-tracking',
        heroMedia: {
            type: 'video',
            url: u('/videos/mouse_tracking.mp4'),
            caption: 'Tracking Output'
        },
        gallery: [
            { type: 'image', url: u('/papers/mouse_heatmap.png'), caption: 'Movement Heatmap' },
            { type: 'pdf', url: u('/papers/project3.pdf'), caption: 'Paper' }
        ]
    },
    {
        id: 'terrafair',
        category: 'research',
        title: 'TerraFair',
        subtitle: 'Algorithmic Justice in Urban Planning',
        problemStatement: 'Urban planning datasets are often biased against marginalized communities.',
        solution: 'Developed a bias detection toolkit for urban datasets using statistical parity metrics.',
        awards: ['🏆 TerraFair Finalist', '🥇 Best Paper Section A'],
        techStack: ['Python', 'Scikit-learn', 'Pandas'],
        heroMedia: {
            type: 'pdf',
            url: u('papers/Proposal for Microphones Intelligent System Technology.pdf'),
            caption: 'Research Proposal'
        },
        gallery: [
            { type: 'image', url: u('/papers/terrafair_award.png'), caption: 'Award Ceremony' }
        ]
    },

    // --- ART ---
    {
        id: 'rocky-guardian',
        category: 'art',
        title: 'Rocky Guardian',
        subtitle: '3D Character Design',
        problemStatement: 'Create a low-poly but high-detail character for a fantasy RPG.',
        techStack: ['Blender', 'Substance Painter', 'ZBrush'],
        heroMedia: {
            type: 'sketchfab',
            url: '6bca7a457b5a4933b557efe4de453c57', // ID only for embed
            caption: 'Interactive 3D View'
        },
        gallery: [
            { type: 'video', url: '/videos/rocky_render.mp4', caption: 'Turntable Render' }
        ]
    },
    {
        id: 'sung-jin-woo-weapons',
        category: 'art',
        title: 'Sung Jin Woo Weapons',
        subtitle: 'Solo Leveling Fan Art',
        problemStatement: 'Recreating iconic weapons from the Solo Leveling manhwa.',
        techStack: ['Blender'],
        heroMedia: {
            type: 'sketchfab',
            url: 'f3e6a6af1a4947e7906b24cdea4ae0e2',
            caption: 'Interactive 3D View'
        }
    },
    {
        id: 'noebius',
        category: 'art',
        title: 'Noebius',
        subtitle: 'Fantasy Creature',
        problemStatement: 'A biological mount design from "FFF-Class Trash Hero", created in 8th grade.',
        techStack: ['Blender'],
        heroMedia: {
            type: 'sketchfab',
            url: 'd3c8cc9f215940acaa76fad98ca8d5a6',
            caption: 'Interactive 3D View'
        }
    },
    {
        id: 'three-swords',
        category: 'art',
        title: 'Three Cool Swords',
        subtitle: 'Game Assets',
        problemStatement: 'Original sword designs created for a Roblox game development project (8th grade).',
        techStack: ['Blender'],
        heroMedia: {
            type: 'sketchfab',
            url: '9a3106850b214290b6b6a99713110958',
            caption: 'Interactive 3D View'
        }
    }
];
