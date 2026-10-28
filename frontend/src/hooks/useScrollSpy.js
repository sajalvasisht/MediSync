/**
 * useScrollSpy — tracks which section is currently in view
 * and returns its id. Used by Navbar for scroll-based active link.
 */
import { useState, useEffect, useRef } from 'react';

/**
 * @param {string[]} ids   - Array of section element IDs to watch
 * @param {number}  offset - Top offset in px (e.g. navbar height)
 * @returns {string}       - The currently active section id
 */
const useScrollSpy = (ids, offset = 80) => {
  const [activeId, setActiveId] = useState(ids[0] || '');
  const observer = useRef(null);

  useEffect(() => {
    if (!ids.length) return;

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: `-${offset}px 0px -60% 0px`,
      threshold: 0,
    });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.current.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [ids, offset]);

  return activeId;
};

export default useScrollSpy;
