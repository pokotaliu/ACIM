import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { getLessonById, hasLessonContent } from '../data/lessons';
import { lesson1 } from '../data/lesson1';
import Scene from '../components/Scene';
import MusicControl from '../components/MusicControl';
import PracticeMode from '../components/PracticeMode';
import ProgressButton from '../components/ProgressButton';

// Map lesson IDs to their content data
const lessonData = {
  1: lesson1
};

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lessonId = parseInt(id, 10);

  const [showPractice, setShowPractice] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [pastScenes, setPastScenes] = useState(new Set());

  const { isLessonCompleted, toggleLessonComplete, setCurrentLesson, isLoaded } = useProgress();

  // Scene refs for intersection observer
  const sceneRefs = useRef([]);
  const observerRef = useRef(null);

  // Get lesson info
  const lessonInfo = getLessonById(lessonId);
  const lessonContent = lessonData[lessonId];
  const hasContent = hasLessonContent(lessonId);

  // Update current lesson when visiting
  useEffect(() => {
    if (lessonId && isLoaded) {
      setCurrentLesson(lessonId);
    }
  }, [lessonId, setCurrentLesson, isLoaded]);

  // Redirect to home if lesson doesn't exist or has no content
  useEffect(() => {
    if (!lessonInfo) {
      navigate('/');
    } else if (!hasContent) {
      navigate('/');
    }
  }, [lessonInfo, hasContent, navigate]);

  // Setup intersection observer for scenes
  useEffect(() => {
    if (!lessonContent?.scenes) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.sceneIndex, 10);

          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSceneIndex(index);

            // Mark all previous scenes as past
            setPastScenes((prev) => {
              const newSet = new Set(prev);
              for (let i = 0; i < index; i++) {
                newSet.add(i);
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '0px 0px -20% 0px'
      }
    );

    // Observe all scene elements
    sceneRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.sceneIndex = index;
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lessonContent?.scenes]);

  const handlePracticeMode = useCallback(() => {
    setShowPractice(true);
  }, []);

  const handleNextLesson = useCallback(() => {
    navigate(`/lesson/${lessonId + 1}`);
  }, [navigate, lessonId]);

  // Show loading or redirect while checking
  if (!lessonInfo || !hasContent || !lessonContent) {
    return null;
  }

  const isCompleted = isLessonCompleted(lessonId);

  return (
    <div className="lesson-container">
      {/* Music Control */}
      <MusicControl />

      {/* Scenes */}
      <div className="scenes-wrapper">
        {lessonContent.scenes.map((scene, index) => (
          <div
            key={scene.id}
            ref={(el) => (sceneRefs.current[index] = el)}
            data-scene-index={index}
          >
            <Scene
              scene={scene}
              isActive={index === activeSceneIndex}
              isPastScene={pastScenes.has(index)}
              onPracticeMode={handlePracticeMode}
              onNextLesson={handleNextLesson}
            />
          </div>
        ))}
      </div>

      {/* Progress Button - appears after closing scene */}
      {pastScenes.has(lessonContent.scenes.length - 2) && (
        <div className="progress-section fade-in-section is-visible">
          <ProgressButton
            lessonId={lessonId}
            isCompleted={isCompleted}
            onToggle={toggleLessonComplete}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="lesson-footer">
        <div className="footer-divider" />
        <p className="footer-text">
          A Course in Miracles · Workbook Lesson {lessonId}
        </p>
        <p className="footer-subtext">
          Commentary inspired by Kenneth Wapnick
        </p>
      </footer>

      {/* Practice Mode Overlay */}
      {showPractice && (
        <PracticeMode
          prompts={lessonContent.practicePrompts}
          onClose={() => setShowPractice(false)}
        />
      )}
    </div>
  );
}
