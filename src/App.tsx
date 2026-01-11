import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { Hero } from './components/layout/Hero';
import { AboutMe } from './components/layout/AboutMe';
import { Skills } from './components/layout/Skills';
import { ProjectList } from './components/features/ProjectList';
import { ProjectDetail } from './components/features/ProjectDetail';
import { PORTFOLIO_DATA } from './data/portfolio';

// Home Page Component
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Hero />
      <div id="about"><AboutMe /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><ProjectList onSelect={(p) => navigate(`/project/${p.id}`)} /></div>
    </div>
  );
};

// Wrapper for Project Detail to handle route params
const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find project
  const project = PORTFOLIO_DATA.find(p => p.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <div>Project not found</div>;

  return (
    <ProjectDetail
      project={project}
      onBack={() => navigate('/')}
    />
  );
};

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
