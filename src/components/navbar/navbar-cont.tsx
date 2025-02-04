"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { DropdownContext } from "@/providers/navbar-provider";
import { usePathname } from "next/navigation";

export default function NavbarCont({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerRef = useRef<HTMLHeadElement>(null);
  const lastScroll = useRef(0);
  const menu = useContext(DropdownContext);
  const pathname = usePathname();

  // Handle route changes
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const currentScroll = window.scrollY;
    header.classList.remove("-translate-y-full");

    header.classList.toggle("shadow-md", currentScroll > header.offsetHeight);
  }, [pathname]);

  // Handle scroll behavior
  useEffect(() => {
    const header = headerRef.current;
    if (!header || !menu) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      const headerHeight = header.offsetHeight;
      const scrolledPastHeader = currentScroll > headerHeight;
      const scrollingDown = currentScroll > lastScroll.current;

      header.classList.toggle(
        "-translate-y-full",
        scrolledPastHeader && scrollingDown && !menu.isMenuOpen,
      );

      if ((scrolledPastHeader && !scrollingDown) || menu.isMenuOpen)
        header.classList.add("sticky", "shadow-md");
      else if (currentScroll === 0)
        header.classList.remove("sticky", "shadow-md");

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menu]);

  // Handle window resize
  useEffect(() => {
    if (!menu) return;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        menu.setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menu]);

  return (
    <header
      ref={headerRef}
      className="relative top-0 z-50 bg-background px-cont-sm transition-transform duration-300 md:px-cont-md lg:px-cont-lg xl:px-cont-xl"
    >
      {children}
    </header>
  );
}
