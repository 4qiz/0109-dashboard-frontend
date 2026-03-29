"use client";

import { cn } from "@/shared/lib/utils";
import { useShaderBackground } from "./animated-shader-hero";

export const StarsBackground = ({ className = "" }) => {
  const canvasRef = useShaderBackground();

  return (
    <div
      className={cn(
        "relative w-full h-screen overflow-hidden bg-black",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain touch-none"
        style={{ background: "black" }}
      />
    </div>
  );
};
