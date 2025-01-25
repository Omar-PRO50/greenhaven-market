"use client";
import { IoMdMenu } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import Link from "next/link";
import { useContext } from "react";
import { DropdownContext } from "@/providers/navbar-provider";

export default function DropdownButton({}) {
  const menu = useContext(DropdownContext);

  const toggleMenu = () => {
    menu!.setIsMenuOpen(!menu!.isMenuOpen);
  };
  const Links = [
    { name: "Blog", href: "/blog" },
    { name: "Shop", href: "/shop" },
    { name: "Log In", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ];

  return (
    <>
      <button
        type="button"
        className="mr-1 w-fit md:hidden"
        onClick={toggleMenu}
      >
        <IoMdMenu
          className={`absolute top-1/2 -translate-y-1/2 ${!menu!.isMenuOpen ? "z-20 opacity-100" : "z-10 opacity-0"}`}
        />

        <RiCloseLargeFill
          size={23}
          className={`absolute top-1/2 -translate-y-1/2 ${
            menu!.isMenuOpen ? "z-20 opacity-100" : "z-10 opacity-0"
          }`}
        />
      </button>

      {/* Dropdown */}
      <ul
        style={{ top: "calc(100% - 1px)" }}
        className={`absolute block w-full overflow-y-hidden bg-background bg-inherit text-center shadow-md transition-[max-height] duration-500 md:hidden ${
          menu!.isMenuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        {Links.map((link) => (
          <li key={link.name} className="py-4 text-lg">
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
