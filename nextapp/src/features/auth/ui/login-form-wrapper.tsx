"use client";

import { useActionState } from "react";
import { LoginForm } from "./login-form";
import { login, LoginState } from "../actions/login";

const initialState: LoginState = {
  error: undefined,
  login: "",
  password: "",
};

export function LoginFormWrapper() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return <LoginForm action={formAction} state={state} isPending={isPending} />;
}
