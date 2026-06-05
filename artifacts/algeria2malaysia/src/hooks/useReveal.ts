import { useEffect, useRef, useCallback } from "react";

export function useReveal(threshold = 0.12) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  function getObserver() {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold }
      );
    }
    return observerRef.current;
  }

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  const reveal = useCallback((el: HTMLElement | null) => {
    if (el) getObserver().observe(el);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return reveal;
}
