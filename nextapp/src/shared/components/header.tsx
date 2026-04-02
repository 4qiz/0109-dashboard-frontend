import { ToggleTheme } from "./toggle-theme";

interface HeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const Header = ({ title, description, icon }: HeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-background border-b">
      <div className="container  mx-auto px-4 lg:px-6 py-2 ">
        <div className="flex items-center gap-3 lg:ml-0 ml-14">
          <div className="hidden md:block">{icon}</div>

          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="relative overflow-hidden w-full">
              <div className="flex w-max gap-12">
                <h1 className="text-2xl text-nowrap text-clip ">{title}</h1>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background"></div>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="ml-auto">
            <ToggleTheme />
          </div>
        </div>
      </div>
    </div>
  );
};
