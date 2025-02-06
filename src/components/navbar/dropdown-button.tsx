"use client";

import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { DropdownContext } from "@/context/navbar-context";
import { LuAlignJustify } from "react-icons/lu";
import { PiX } from "react-icons/pi";

export default function DropdownButton({}) {
  const menu = useContext(DropdownContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    menu!.setIsMenuOpen(!menu!.isMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        menu!.setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  const Links = [
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Log In", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ];

  return (
    <>
      <button
        ref={buttonRef}
        name="toggleMenu"
        type="button"
        className="mr-1 size-[25px] navbar:hidden"
        onClick={toggleMenu}
      >
        <LuAlignJustify
          strokeWidth={1.5}
          className={`absolute top-1/2 -translate-y-1/2 ${!menu!.isMenuOpen ? "z-20 opacity-100" : "z-10 opacity-0"}`}
        />
        <PiX
          className={`absolute top-1/2 -translate-y-1/2 ${
            menu!.isMenuOpen ? "z-20 opacity-100" : "z-10 opacity-0"
          }`}
        />
      </button>

      {/* Dropdown */}
      <ul
        ref={dropdownRef}
        style={{ top: "calc(100% - 1px)" }}
        className={`absolute left-0 z-10 block w-screen overflow-y-hidden bg-background text-center shadow-md transition-[max-height] duration-500 navbar:hidden ${
          menu!.isMenuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        {Links.map((link) => (
          <li key={link.name} className="py-4 text-lg">
            <Link
              onClick={() => {
                menu!.setIsMenuOpen(false);
              }}
              className="focus:underline"
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
