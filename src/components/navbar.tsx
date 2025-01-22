"use client";

import Link from "next/link";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { LuUserRound } from "react-icons/lu";
import { IconContext, IconType } from "react-icons";
import { IoMdMenu } from "react-icons/io";

//on scroll down : check if scrolled past the navbar ? next : nothing
//next:

export default function Navbar() {
  const headerRef = useRef<HTMLHeadElement>(null);
  const [isLarge, setIsLarge] = useState(false);
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
              headerRef.current.classList.add("-translate-y-full");
              //down
            } else {
              headerRef.current.classList.add("sticky");
              headerRef.current.classList.remove("-translate-y-full");
              //up
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
    setIsLarge(window.innerWidth >= 768);
    const handleResize = () => setIsLarge(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <IconContext.Provider
      value={{
        size: "25",
        className: "",
      }}
    >
      <header
        ref={headerRef}
        className="px-cont-sm md:px-cont-md lg:px-cont-lg xl:px-cont-xl relative top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center bg-background py-7 text-main-light underline-offset-2 shadow-md transition-transform duration-300"
      >
        {isLarge ? (
          <nav className="flex gap-6 text-lg">
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </nav>
        ) : (
          <DropdownButton
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}

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
          {isLarge && <HeaderIcon Icon={LuUserRound} />}

          <HeaderIcon Icon={MdOutlineShoppingBag} />

          <HeaderIcon Icon={IoSearch} />
        </div>
      </header>
    </IconContext.Provider>
  );
}

function HeaderIcon({ Icon }: { Icon: IconType }) {
  return (
    <span className="flex size-7 items-center justify-center transition-transform hover:scale-[1.1]">
      <button>
        <Icon />
      </button>
    </span>
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
      <button
        className="group mr-1 w-fit transition-transform"
        onClick={toggleMenu}
      >
        <IoMdMenu
          className={`transition-all ${
            !isMenuOpen ? "opacity-100" : "opacity-0"
          } group-hover:scale-[1.1]`}
        />

        <RiCloseLargeFill
          size={23}
          className={`transition-all ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          } absolute top-1/2 -translate-y-1/2 hover:scale-[1.1]`}
        />
      </button>

      {/* Dropdown */}
      <ul
        className={`absolute top-full block w-full overflow-y-hidden bg-white text-center shadow-md transition-[max-height] duration-500 ${
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
