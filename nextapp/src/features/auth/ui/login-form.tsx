import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { login } from "../actions/login";
import { PasswordInput } from "./password-input";
import { NeuroNoise } from "@paper-design/shaders-react";
import { ToggleTheme } from "@/shared/components/toggle-theme";
import { StarsBackground } from "@/shared/components/background/stars-background";
import { Github, TriangleAlert } from "lucide-react";

type Props = {
  error: string | undefined;
};

export const LoginForm = ({ error }: Props) => {
  return (
    <section className="fixed inset-0 ">
      {/* Background */}
      <div className=" dark:hidden absolute inset-0 -z-10 h-full w-full">
        <StarsBackground />
      </div>

      <div className="hidden dark:block absolute inset-0 -z-10">
        <NeuroNoise
          width="100%"
          height="100%"
          colorBack="#000000"
          colorMid="#47a6ff"
          colorFront="#c4c4c4"
          brightness={0}
          contrast={0.3}
          speed={0.14}
          className=""
        />
      </div>

      {/* Centered Login Card */}
      <div className="h-full w-full grid place-items-stretch md:place-items-center md:px-4 ">
        <Card
          className=" w-full md:max-w-md rounded-none md:rounded-xl  
        bg-amber-950/10 border border-amber-500/50  
        dark:bg-blue-500/5 dark:border-blue-500/35 
        backdrop-blur-none md:backdrop-blur-xl shadow-2xl"
        >
          <CardHeader className="pt-20 md:pt-0">
            <CardTitle className="flex justify-between">
              <h1
                className="text-2xl md:text-3xl font-bold 
              bg-linear-to-r 
              not-dark:from-orange-300 not-dark:via-yellow-400 not-dark:to-amber-300 not-dark:text-transparent
              bg-clip-text"
              >
                Вход
              </h1>

              <ToggleTheme className="not-dark:text-yellow-400 not-dark:hover:text-yellow-400 not-dark:hover:bg-yellow-400/10" />
            </CardTitle>
            <CardDescription className=" not-dark:text-orange-100/90 leading-relaxed">
              Скажите{" "}
              <a
                href="https://github.com/4qiz/0109-dashboard-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-medium "
              >
                мяу
              </a>{" "}
              чтобы подтвердить, что вы не человек
            </CardDescription>
          </CardHeader>

          <form action={login}>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="login" className="not-dark:text-orange-50">
                  Имя котика
                </Label>
                <div className="relative">
                  <Input
                    id="login"
                    name="login"
                    className="border text-lg   backdrop-blur-xl
                    not-dark:focus:ring-amber-500/20 
                    not-dark:bg-orange-500/10  
                    not-dark:border-orange-300/30 
                    not-dark:hover:border-orange-300/50 
                    not-dark:text-orange-50"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-orange-50">
                  Секретный мяу
                </Label>
                <PasswordInput
                  className="border text-lg backdrop-blur-xl
                not-dark:focus:ring-amber-500/20 
                not-dark:bg-orange-500/10 
                not-dark:border-orange-300/30 
                not-dark:hover:border-orange-300/50 
                not-dark:text-orange-50 "
                />
              </div>

              <Button
                className="w-full font-semibold border backdrop-blur-xl 
                not-dark:bg-orange-500/10 
                not-dark:hover:bg-orange-500/20  
                not-dark:border-orange-300/30 
                not-dark:hover:border-orange-300/50 
                not-dark:text-orange-50 
                dark:bg-blue-500/10 
                dark:hover:bg-blue-500/20 
                dark:text-foreground"
                type="submit"
              >
                Тук-тук
              </Button>

              {error && (
                <div className="flex items-center gap-1 text-sm text-orange-600 dark:text-destructive">
                  <TriangleAlert />
                  {error}
                </div>
              )}
            </CardContent>
          </form>
        </Card>
      </div>
      {/* Github link */}
      {/* <a
        href="https://github.com/4qiz/0109-dashboard-frontend"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-1/2 -translate-x-1/2
  flex items-center gap-2 px-3 py-2 rounded-full
  
  not-dark:bg-orange-500/10 not-dark:border-orange-300/30 not-dark:text-orange-50
  not-dark:hover:bg-orange-500/20
  dark:bg-blue-500/10 dark:border-blue-500/35 dark:hover:bg-blue-500/20
  transition-all duration-200"
      >
        backdrop-blur-xl border 
        <Github className="w-5 h-5" />
        <span className="text-sm font-medium">GitHub</span>
      </a> */}
    </section>
  );
};
