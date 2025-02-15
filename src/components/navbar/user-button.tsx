"use client";
import { DropdownContext } from "@/context/navbar-context";
import Link from "next/link";
import { useContext } from "react";
import { LuUserRound } from "react-icons/lu";

export default function UserButton({ isDropdown }: { isDropdown?: boolean }) {
  const menu = useContext(DropdownContext);
  return (
    <Link
      href={"/account"}
      onClick={() => {
        menu!.setIsMenuOpen(false);
      }}
      className={`${isDropdown && "focus:underline"}`}
    >
      {isDropdown ? <span>Account</span> : <LuUserRound strokeWidth={1.5} />}
    </Link>
  );
}
