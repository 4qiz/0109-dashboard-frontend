"use client";

import { Input } from "@/shared/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const PasswordInput = ({ className }: { className?: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        className={className}
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md cursor-pointer text-orange-200/75  dark:text-muted-foreground/75 dark:hover:text-muted-foreground"
        onClick={() => setShowPassword((v) => !v)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};
