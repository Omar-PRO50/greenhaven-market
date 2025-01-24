"use client";

import { createContext } from "react";
import { IconContext } from "react-icons";

export const ThemeContext = createContext({});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IconContext.Provider
      value={{
        size: "25",
        className: "transition-all hover:scale-[1.1]",
      }}
    >
      {children}
    </IconContext.Provider>
  );
}
