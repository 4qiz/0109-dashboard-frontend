"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  fallbackHref?: string; // если нет истории
  className?: string;
  label?: string;
};

export function BackButton({
  fallbackHref = "/",
  className = "",
  label = "Назад",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackHref) {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors ${className}`}
      type="button"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}
