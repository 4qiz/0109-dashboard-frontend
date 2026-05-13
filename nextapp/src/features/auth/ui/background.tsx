"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BlackBackdrop = () => <div className="w-full h-screen bg-black" />;

const ThreeSceneDeferred = dynamic(
  () =>
    import("@/shared/components/background/threejs/scene").then(
      (mod) => mod.ThreeScene,
    ),
  { ssr: false, loading: BlackBackdrop },
);

export const Background = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [mountScene, setMountScene] = useState(false);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!canvas.getContext("webgl2");
      } catch {
        return false;
      }
    };

    setHasWebGL(checkWebGL());
  }, []);

  useEffect(() => {
    if (hasWebGL !== true) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let rafOuter = 0;
    let rafInner = 0;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const scheduleMount = () => {
      if (!cancelled) setMountScene(true);
    };

    rafOuter = requestAnimationFrame(() => {
      rafInner = requestAnimationFrame(() => {
        if (cancelled) return;
        if (typeof window.requestIdleCallback === "function") {
          idleId = window.requestIdleCallback(scheduleMount, {
            timeout: 2000,
          });
        } else {
          timeoutId = setTimeout(scheduleMount, 1);
        }
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafInner);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [hasWebGL]);

  const showCanvas = hasWebGL === true && mountScene;

  return (
    <div className="absolute inset-0 z-0">
      {showCanvas ? <ThreeSceneDeferred /> : <BlackBackdrop />}
    </div>
  );
};
