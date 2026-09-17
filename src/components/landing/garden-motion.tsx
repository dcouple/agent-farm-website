"use client";

import { useEffect, useRef } from "react";

/** Small decorative layers; CSS does the motion, JS only controls playback. */
export function GardenMotion() {
  const garden = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = garden.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      element.dataset.running = String(visible && !document.hidden && !preference.matches);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div className="garden-motion" ref={garden}>
      <div className="garden-details" aria-hidden="true">
        <svg className="garden-sprig garden-sprig-left" viewBox="0 0 36 64" fill="none">
          <path d="M19 62V30h-2V17" stroke="#91aa70" strokeWidth="2" />
          <path d="M18 43H9v-4H5v-8h8v4h5ZM19 33h8v-4h5v-9h-8v4h-5ZM17 21h-7v-4H7V8h7v4h3Z" fill="#779951" />
          <path d="M9 32h4v4H9Zm16-11h5v4h-5ZM8 9h5v4H8Z" fill="#c0cc83" />
        </svg>
        <svg className="garden-sprig garden-sprig-right" viewBox="0 0 36 64" fill="none">
          <path d="M17 63V24h2V10" stroke="#9caf70" strokeWidth="2" />
          <path d="M17 46H9v-4H4V31h9v5h4ZM18 32h9v-4h5V17h-9v5h-5ZM19 17h-7v-4H9V4h7v4h3Z" fill="#91a861" />
          <path d="M5 32h7v4H5Zm19-14h6v4h-6ZM10 5h5v4h-5Z" fill="#c7cf8c" />
        </svg>
        <span className="garden-pollen garden-pollen-one" />
        <span className="garden-pollen garden-pollen-two" />
        <span className="garden-pollen garden-pollen-three" />
      </div>
    </div>
  );
}
