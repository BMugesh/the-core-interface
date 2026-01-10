import { useEffect, useRef, useCallback } from 'react';

const visitedSectionsKey = 'portfolio_visited_sections';

/**
 * Hook to track which sections have been visited in the current session
 * Returns whether section has been seen before and mark function
 */
export const useVisitedSections = () => {
  const visitedRef = useRef<Set<string>>(new Set());

  // Initialize from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(visitedSectionsKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        visitedRef.current = new Set(parsed);
      } catch {
        visitedRef.current = new Set();
      }
    }
  }, []);

  const markSectionVisited = useCallback((sectionId: string) => {
    if (!visitedRef.current.has(sectionId)) {
      visitedRef.current.add(sectionId);
      // Persist to sessionStorage
      sessionStorage.setItem(
        visitedSectionsKey,
        JSON.stringify(Array.from(visitedRef.current))
      );
    }
  }, []);

  const hasVisited = useCallback((sectionId: string) => {
    return visitedRef.current.has(sectionId);
  }, []);

  return { markSectionVisited, hasVisited };
};
