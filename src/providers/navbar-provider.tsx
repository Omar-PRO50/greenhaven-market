"use client";

import { createContext, SetStateAction, useState } from "react";
import { IconContext } from "react-icons";

export function IconThemeProvider({ children }: { children: React.ReactNode }) {
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

type DropdownContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: SetStateAction<boolean>) => void;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export function DropdownProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </DropdownContext.Provider>
  );
}
