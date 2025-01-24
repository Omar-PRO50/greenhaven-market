import Link from "next/link";
import Image from "next/image";

import {
  DropdownProvider,
  IconThemeProvider,
} from "@/providers/navbar-provider";
import NavbarCont from "./navbar-cont";
import DropdownButton from "./dropdown-button";
import SearchButton from "./search-button";
import CartButton from "./cart-button";
import UserButton from "./user-button";

export default function Navbar() {
  return (
    <DropdownProvider>
      <IconThemeProvider>
        <NavbarCont>
          <div className="relative top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center bg-background px-cont-sm py-7 text-main-light underline-offset-2 shadow-md transition-transform duration-300 md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
            <nav className="hidden gap-6 text-lg md:flex">
              <Link href="/shop" className="hover:underline">
                Shop
              </Link>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </nav>
            <DropdownButton />
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
              <span className="hidden items-center md:flex">
                <UserButton />
              </span>

              <CartButton />

              <SearchButton />
            </div>
          </div>
        </NavbarCont>
      </IconThemeProvider>
    </DropdownProvider>
  );
}
