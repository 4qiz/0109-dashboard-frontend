"use client";

import { LogOut, Moon, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useUser } from "@/shared/lib/user-context";
import { logout } from "@/features/auth/actions/logout";

export function UserDropDown() {
  const user = useUser();
  const { theme, setTheme } = useTheme();
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const onChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMd(event.matches);
    };

    onChange(mediaQuery);
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={user?.isAdmin ? "destructive" : "default"}
          size={isMd ? "sm" : "icon"}
          className="h-9 rounded-full"
        >
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {isMd && (
              <span className="hidden sm:inline">
                {user?.login ?? "Профиль"}
              </span>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={handleToggleTheme}>
            <div className="flex items-center gap-2">
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              Сменить тему
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={handleLogout} className="">
            <div className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Выйти
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
