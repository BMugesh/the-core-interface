import { useEffect, useRef, useCallback } from 'react';

const visitedSectionsKey = 'portfolio_visited_sections';

/**
 * Hook to track which sections have been visited in the current session
 * Returns whether section has been seen before and mark function
 */
export const useVisitedSections = () => {
  const visitedRef = useRef<Set<string> | null>(null);

  // Initialize synchronously to ensure first render has correct state
  if (!visitedRef.current) {
    const stored = sessionStorage.getItem(visitedSectionsKey);
    if (stored) {
      try {
        visitedRef.current = new Set(JSON.parse(stored));
      } catch {
        visitedRef.current = new Set();
      }
    } else {
      visitedRef.current = new Set();
    }
  }

  const markSectionVisited = useCallback((sectionId: string) => {
    if (visitedRef.current && !visitedRef.current.has(sectionId)) {
      visitedRef.current.add(sectionId);
      // Persist to sessionStorage
      sessionStorage.setItem(
        visitedSectionsKey,
        JSON.stringify(Array.from(visitedRef.current))
      );
    }
  }, []);

  const hasVisited = useCallback((sectionId: string) => {
    return visitedRef.current ? visitedRef.current.has(sectionId) : false;
  }, []);

  return { markSectionVisited, hasVisited };
};
