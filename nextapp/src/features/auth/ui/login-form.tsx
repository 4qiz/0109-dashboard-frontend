"use client";

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

import { PasswordInput } from "./password-input";
import { ToggleTheme } from "@/shared/components/toggle-theme";
import { Loader2, TriangleAlert } from "lucide-react";
import { Background } from "./background";
import { LoginState } from "../actions/login";
import { cn } from "@/shared/lib/utils";

type Props = {
  action: (formData: FormData) => void;
  state: LoginState;
  isPending: boolean;
};

export const LoginForm = ({ action, state, isPending }: Props) => {
  return (
    <section className="fixed inset-0 ">
      {/* Background */}
      <Background />

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

          <form action={action}>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="login" className="not-dark:text-orange-50">
                  Имя котика
                </Label>
                <div className="relative">
                  <Input
                    id="login"
                    name="login"
                    defaultValue={state.login}
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
                  defaultValue={state.password}
                  className="border text-lg backdrop-blur-xl
                not-dark:focus:ring-amber-500/20 
                not-dark:bg-orange-500/10 
                not-dark:border-orange-300/30 
                not-dark:hover:border-orange-300/50 
                not-dark:text-orange-50 "
                />
              </div>

              <Button
                disabled={isPending}
                aria-disabled={isPending}
                className={cn(
                  "w-full font-semibold border backdrop-blur-xl",
                  "not-dark:bg-orange-500/10 ",
                  "not-dark:hover:bg-orange-500/20  ",
                  "not-dark:border-orange-300/30 ",
                  "not-dark:hover:border-orange-300/50 ",
                  "not-dark:text-orange-50 ",
                  "dark:bg-blue-500/10 ",
                  "dark:hover:bg-blue-500/20 ",
                  "dark:text-foreground",
                  isPending && "cursor-not-allowed opacity-80",
                )}
                type="submit"
              >
                <span className="flex items-center justify-center gap-2">
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />}

                  <span
                    className={cn(
                      "transition-all duration-200",
                      isPending && "opacity-90",
                    )}
                  >
                    {isPending ? "" : "Тук-тук"}
                  </span>
                </span>

                {/* subtle shimmer overlay */}
                {isPending && (
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <span className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </span>
                )}
              </Button>

              {state.error && (
                <div className="flex items-center gap-1 text-sm text-orange-600 dark:text-destructive">
                  <TriangleAlert />
                  {state.error}
                </div>
              )}
            </CardContent>
          </form>
        </Card>
      </div>
    </section>
  );
};
