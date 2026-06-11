"use client";

import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
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
import { Button } from "../ui/button";

export function UserDropDown() {
  const user = useUser();
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          {/* large */}
          <Button
            className="hidden md:flex rounded-full"
            variant={user?.isAdmin ? "destructive" : "default"}
          >
            <User />
            {user?.login ?? "Профиль"}
          </Button>

          {/* small */}
          <Button
            className=" md:hidden shrink-0 rounded-full"
            size={"icon"}
            variant={user?.isAdmin ? "destructive" : "default"}
          >
            <User />
          </Button>
        </div>
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
