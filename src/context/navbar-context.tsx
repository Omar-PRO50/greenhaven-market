"use client";

import { createContext, SetStateAction, useState } from "react";
import { IconContext } from "react-icons";

export function IconThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider
      value={{
        size: "23",
        className: "transition-all hover:scale-[1.1] hover:cursor-pointer",
      }}
    >
      {children}
    </IconContext.Provider>
  );
}

type DropdownContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: SetStateAction<boolean>) => void;
};

export const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

export function DropdownProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </DropdownContext.Provider>
  );
}
