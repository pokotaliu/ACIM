import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import StudyPage from './pages/StudyPage';
import MindTranslatorPage from './pages/MindTranslatorPage';

function App() {
  // Signal that React app is ready
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('react-ready'));
  }, []);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/study/:lessonId" element={<StudyPage />} />
          <Route path="/mind-translator/:lessonId" element={<MindTranslatorPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
