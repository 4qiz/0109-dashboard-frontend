"use client";

import type { UserDto } from "@/entities/user/auth-dto";
import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext<UserDto | null>(null);

export const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: UserDto | null;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
