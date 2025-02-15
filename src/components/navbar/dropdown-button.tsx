"use client";

import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { DropdownContext } from "@/context/navbar-context";
import { LuAlignJustify } from "react-icons/lu";
import { PiX } from "react-icons/pi";
import UserButton from "./user-button";

export default function DropdownButton({}) {
  const menu = useContext(DropdownContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (menu?.isMenuOpen) {
      setHeight(dropdownRef.current!.scrollHeight); // Get content height
    } else {
      setHeight(0); // Collapse
    }
  }, [menu]);

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
        style={{ top: "calc(100% - 1px)", height: height }}
        className={`absolute left-0 z-10 block w-screen overflow-y-hidden bg-background text-center text-lg shadow-md transition-[height] duration-500 navbar:hidden`}
      >
        {Links.map((link) => (
          <li key={link.name} className="py-4">
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
        <li className="py-4">
          <UserButton isDropdown />
        </li>
      </ul>
    </>
  );
}
