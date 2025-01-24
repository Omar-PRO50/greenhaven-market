"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { DropdownContext } from "@/providers/navbar-provider";
export default function NavbarCont({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerRef = useRef<HTMLHeadElement>(null);
  const [lastScroll, setlastScroll] = useState(0);
  const menu = useContext(DropdownContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (headerRef.current) {
        if (menu!.isMenuOpen) {
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
  }, [lastScroll, menu]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) menu!.setIsMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menu]);

  return <header ref={headerRef}>{children}</header>;
}
