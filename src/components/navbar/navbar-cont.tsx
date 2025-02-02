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
  const [lastScroll, setlastScroll] = useState(0);
  const menu = useContext(DropdownContext);
  const pathname = usePathname(); // Get the current route

  // Reset Navbar on Route Change
  useEffect(() => {
    const currentScroll = window.scrollY;
    if (headerRef.current) {
      headerRef.current.classList.remove("-translate-y-full");
      if (currentScroll > headerRef.current.offsetHeight) {
        //past header or the dropdown is open
        headerRef.current.classList.add("sticky", "shadow-md");
      } else {
        //at the top of the page
        headerRef.current.classList.remove("sticky", "shadow-md");
      }
    }
  }, [pathname]); // Runs whenever the route changes

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (headerRef.current) {
        if (menu!.isMenuOpen) {
          headerRef.current.classList.add("sticky", "shadow-md");
        } else {
          if (currentScroll > headerRef.current.offsetHeight) {
            //past header
            if (currentScroll > lastScroll) {
              //down
              headerRef.current.classList.add("-translate-y-full");
            } else {
              //up
              headerRef.current.classList.add("sticky", "shadow-md");
              headerRef.current.classList.remove("-translate-y-full");
            }
          } else if (currentScroll === 0) {
            //at the top
            headerRef.current.classList.remove("sticky", "shadow-md");
          }
        }
      }
      setlastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScroll, menu]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) menu!.setIsMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menu]);

  return (
    <header
      ref={headerRef}
      className="top-0 z-50 transition-transform duration-300"
    >
      {children}
    </header>
  );
}
