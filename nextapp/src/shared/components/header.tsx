"use client";

import { ToggleTheme } from "./toggle-theme";
import { Badge } from "@/shared/ui/badge";
import { useUser } from "@/shared/lib/user-context";

interface HeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const Header = ({ title, description, icon }: HeaderProps) => {
  const user = useUser();
  return (
    <div className="sticky top-0 z-10 bg-background border-b">
      <div className="container  mx-auto px-4 lg:px-6 py-2 ">
        <div className="flex items-center gap-3 lg:ml-0 ml-14">
          <div className="hidden md:block">{icon}</div>

          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="relative overflow-x-auto w-full">
              <div className="flex w-max gap-12">
                <h1 className="text-2xl whitespace-nowrap text-clip ">
                  {title}
                </h1>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ToggleTheme />
            {user && (
              <div className="flex items-center gap-2">
                <Badge variant={user.isAdmin ? "destructive" : "default"}>
                  {user.login}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
