import { useEffect, useRef, useCallback } from "react";

export function useReveal(threshold = 0.12) {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.current?.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    return () => observer.current?.disconnect();
  }, [threshold]);

  const reveal = useCallback((el: HTMLElement | null) => {
    if (el && observer.current) observer.current.observe(el);
  }, []);

  return reveal;
}
