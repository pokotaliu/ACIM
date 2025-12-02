import { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

/**
 * @typedef {'ego' | 'spiritualEgo' | 'spirit'} MindType
 */

/**
 * @typedef {Object} LessonState
 * @property {number} currentBlockIndex - Current block index (0-based)
 * @property {MindType} currentMind - Current selected mind type
 * @property {import('../types/lesson.js').LessonBlock[]} blocks - All lesson blocks
 */

/**
 * @typedef {Object} LessonAction
 * @property {'SET_BLOCKS' | 'SET_BLOCK_INDEX' | 'NEXT_BLOCK' | 'PREV_BLOCK' | 'SET_MIND'} type
 * @property {*} [payload]
 */

const initialState = {
  currentBlockIndex: 0,
  currentMind: 'ego',
  blocks: [],
};

/**
 * Lesson reducer
 * @param {LessonState} state
 * @param {LessonAction} action
 * @returns {LessonState}
 */
function lessonReducer(state, action) {
  switch (action.type) {
    case 'SET_BLOCKS':
      return {
        ...state,
        blocks: action.payload,
        currentBlockIndex: 0,
      };

    case 'SET_BLOCK_INDEX':
      return {
        ...state,
        currentBlockIndex: Math.max(0, Math.min(action.payload, state.blocks.length - 1)),
      };

    case 'NEXT_BLOCK':
      return {
        ...state,
        currentBlockIndex: Math.min(state.currentBlockIndex + 1, state.blocks.length - 1),
      };

    case 'PREV_BLOCK':
      return {
        ...state,
        currentBlockIndex: Math.max(state.currentBlockIndex - 1, 0),
      };

    case 'SET_MIND':
      return {
        ...state,
        currentMind: action.payload,
      };

    default:
      return state;
  }
}

const LessonContext = createContext(null);

/**
 * LessonProvider component
 */
export function LessonProvider({ children }) {
  const [state, dispatch] = useReducer(lessonReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <LessonContext.Provider value={value}>
      {children}
    </LessonContext.Provider>
  );
}

/**
 * Hook to access lesson context
 * @returns {{ state: LessonState, dispatch: React.Dispatch<LessonAction> }}
 */
export function useLessonContext() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLessonContext must be used within LessonProvider');
  }
  return context;
}

/**
 * Hook to get current block
 * @returns {import('../types/lesson.js').LessonBlock | null}
 */
export function useCurrentBlock() {
  const { state } = useLessonContext();
  return state.blocks[state.currentBlockIndex] ?? null;
}

/**
 * Hook to get current mind type
 * @returns {MindType}
 */
export function useCurrentMind() {
  const { state } = useLessonContext();
  return state.currentMind;
}

/**
 * Hook to get current block index
 * @returns {number}
 */
export function useCurrentBlockIndex() {
  const { state } = useLessonContext();
  return state.currentBlockIndex;
}

/**
 * Hook to get all blocks
 * @returns {import('../types/lesson.js').LessonBlock[]}
 */
export function useBlocks() {
  const { state } = useLessonContext();
  return state.blocks;
}

/**
 * Hook to get block count
 * @returns {number}
 */
export function useBlockCount() {
  const { state } = useLessonContext();
  return state.blocks.length;
}

/**
 * Hook for lesson actions
 */
export function useLessonActions() {
  const { dispatch } = useLessonContext();

  const setBlocks = useCallback((blocks) => {
    dispatch({ type: 'SET_BLOCKS', payload: blocks });
  }, [dispatch]);

  const setBlockIndex = useCallback((index) => {
    dispatch({ type: 'SET_BLOCK_INDEX', payload: index });
  }, [dispatch]);

  const nextBlock = useCallback(() => {
    dispatch({ type: 'NEXT_BLOCK' });
  }, [dispatch]);

  const prevBlock = useCallback(() => {
    dispatch({ type: 'PREV_BLOCK' });
  }, [dispatch]);

  const setMind = useCallback((mind) => {
    dispatch({ type: 'SET_MIND', payload: mind });
  }, [dispatch]);

  return {
    setBlocks,
    setBlockIndex,
    nextBlock,
    prevBlock,
    setMind,
  };
}

/**
 * Hook to get current mind content for current block
 * @returns {import('../types/lesson.js').MindContent | null}
 */
export function useCurrentMindContent() {
  const block = useCurrentBlock();
  const mind = useCurrentMind();

  if (!block || !block.minds) return null;
  return block.minds[mind] ?? null;
}

export default LessonContext;
