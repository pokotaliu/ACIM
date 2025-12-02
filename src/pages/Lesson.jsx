import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { useLessonLoader } from '../hooks/useLessonLoader';
import EngineScene from '../components/EngineScene';
import MusicControl from '../components/MusicControl';
import PracticeMode from '../components/PracticeMode';
import ProgressButton from '../components/ProgressButton';

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lessonId = parseInt(id, 10);

  const [showPractice, setShowPractice] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [pastScenes, setPastScenes] = useState(new Set());

  const { isLessonCompleted, toggleLessonComplete, setCurrentLesson, isLoaded } = useProgress();

  // Load lesson using the engine
  const { lesson, loading, error } = useLessonLoader(lessonId);

  // Scene refs for intersection observer
  const sceneRefs = useRef([]);
  const observerRef = useRef(null);

  // Update current lesson when visiting
  useEffect(() => {
    if (lessonId && isLoaded) {
      setCurrentLesson(lessonId);
    }
  }, [lessonId, setCurrentLesson, isLoaded]);

  // Handle error or missing lesson
  useEffect(() => {
    if (error) {
      console.error('[Lesson] Error loading lesson:', error);
      navigate('/');
    }
  }, [error, navigate]);

  // Debug: Log activeSceneIndex changes
  useEffect(() => {
    console.log('[Lesson] activeSceneIndex:', activeSceneIndex, 'pastScenes:', [...pastScenes]);
  }, [activeSceneIndex, pastScenes]);

  // Setup intersection observer for scenes
  useEffect(() => {
    if (!lesson?.scenes) {
      console.log('[Lesson] No scenes to observe');
      return;
    }
    console.log('[Lesson] Setting up observer for', lesson.scenes.length, 'scenes');

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
  }, [lesson?.scenes]);

  const handlePracticeMode = useCallback(() => {
    setShowPractice(true);
  }, []);

  const handleNextLesson = useCallback(() => {
    navigate(`/lesson/${lessonId + 1}`);
  }, [navigate, lessonId]);

  // Debug: Log lesson state
  useEffect(() => {
    console.log('[Lesson] State:', { loading, error: error?.message, hasLesson: !!lesson, lessonId });
    if (lesson) {
      console.log('[Lesson] Lesson data:', {
        scenesCount: lesson.scenes?.length,
        metadata: lesson.metadata,
        firstSceneElements: lesson.scenes?.[0]?.elements?.length
      });
    }
  }, [loading, error, lesson, lessonId]);

  // Show loading state
  if (loading) {
    console.log('[Lesson] Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-2xl font-serif text-[var(--color-text-muted)]">
            Loading...
          </div>
          <div className="mt-4 text-sm text-[var(--color-text-muted)]">
            Loading lesson {lessonId}...
          </div>
        </div>
      </div>
    );
  }

  // Show error or redirect
  if (error || !lesson) {
    console.log('[Lesson] Error or no lesson:', { error: error?.message, lesson });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading lesson: {error?.message || 'Unknown error'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-gray-200 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isCompleted = isLessonCompleted(lessonId);

  // Generate practice prompts from lesson content
  const practicePrompts = [
    "緩緩環顧四周...",
    "選一個物品...",
    "對它說：這個東西沒有任何意義...",
    "不要急，保持從容...",
    "再選另一個物品...",
    "它也沒有任何意義...",
    "讓這個想法輕輕地存在..."
  ];

  return (
    <div className="lesson-container">
      {/* Music Control */}
      <MusicControl />

      {/* Scenes */}
      <div className="scenes-wrapper">
        {lesson.scenes.map((scene, index) => (
          <div
            key={scene.id}
            ref={(el) => (sceneRefs.current[index] = el)}
            data-scene-index={index}
          >
            <EngineScene
              scene={scene}
              metadata={lesson.metadata}
              isActive={index === activeSceneIndex}
              isPastScene={pastScenes.has(index)}
              onPracticeMode={handlePracticeMode}
              onNextLesson={handleNextLesson}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {pastScenes.has(lesson.scenes.length - 1) && (
        <div className="nav-section fade-in-section is-visible flex justify-center gap-4 py-16">
          <button
            onClick={handlePracticeMode}
            className="btn-scene visible"
          >
            進入練習模式
          </button>
          <button
            onClick={handleNextLesson}
            className="btn-scene visible"
          >
            下一課 →
          </button>
        </div>
      )}

      {/* Progress Button */}
      {pastScenes.has(lesson.scenes.length - 1) && (
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
          prompts={practicePrompts}
          onClose={() => setShowPractice(false)}
        />
      )}
    </div>
  );
}
