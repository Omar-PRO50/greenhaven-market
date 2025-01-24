"use client";

import Link from "next/link";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { LuUserRound } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import ThemeProvider from "@/theme-providers/navbar-icon-provider";

export default function Navbar() {
  const headerRef = useRef<HTMLHeadElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScroll, setlastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (headerRef.current) {
        if (isMenuOpen) {
          headerRef.current.classList.add("sticky");
        } else {
          if (window.scrollY > headerRef.current.offsetHeight) {
            //past header
            if (currentScroll > lastScroll) {
              //down
              headerRef.current.classList.add("-translate-y-full");
            } else {
              //up
              headerRef.current.classList.add("sticky");
              headerRef.current.classList.remove("-translate-y-full");
            }
          } else if (currentScroll === 0) {
            headerRef.current.classList.remove("sticky");
          }
        }
      }
      setlastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScroll, isMenuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider>
      <header
        ref={headerRef}
        className="relative top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center bg-background px-cont-sm py-7 text-main-light underline-offset-2 shadow-md transition-transform duration-300 md:px-cont-md lg:px-cont-lg xl:px-cont-xl"
      >
        <nav className="hidden gap-6 text-lg md:flex">
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
        </nav>

        <DropdownButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/*Logo */}
        <h1>
          <Link href="/">
            <Image
              // className="h-auto"
              src="/logo.svg"
              alt="GreenHaven Market Logo"
              width="180"
              height="25"
            />
          </Link>
        </h1>

        <div className="flex justify-end gap-6">
          <LuUserRound className="hidden md:block" />

          <MdOutlineShoppingBag />

          <IoSearch />
        </div>
      </header>
    </ThemeProvider>
  );
}

function DropdownButton({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const Links = [
    { name: "Blog", href: "/blog" },
    { name: "Shop", href: "/shop" },
    { name: "Log In", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ];

  return (
    <>
      <button className="mr-1 w-fit md:hidden" onClick={toggleMenu}>
        <IoMdMenu
          className={`absolute top-1/2 -translate-y-1/2 ${!isMenuOpen ? "z-20 opacity-100" : "z-10 opacity-0"}`}
        />

        <RiCloseLargeFill
          size={23}
          className={`absolute top-1/2 -translate-y-1/2 ${
            isMenuOpen ? "z-20 opacity-100" : "z-10 opacity-0"
          }`}
        />
      </button>

      {/* Dropdown */}
      <ul
        style={{ top: "calc(100% - 1px)" }}
        className={`absolute block w-full overflow-y-hidden bg-background bg-inherit text-center shadow-md transition-[max-height] duration-500 md:hidden ${
          isMenuOpen ? "max-h-64" : "max-h-0"
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
