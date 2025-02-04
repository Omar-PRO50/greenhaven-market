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
          <div className="mx-auto max-w-max-screen-width py-7">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center text-main underline-offset-2">
              <nav className="text-md hidden gap-6 navbar:flex">
                <Link href="/shop" className="hover:underline">
                  Shop All
                </Link>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
                <Link href="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </nav>
              <DropdownButton />
              {/*Logo */}

              <h1>
                <Link href="/">
                  <Image
                    src="/logo.svg"
                    alt="GreenHaven Market Logo"
                    width="180"
                    height="25"
                  />
                </Link>
              </h1>

              <div className="flex justify-end gap-6">
                <SearchButton />

                <CartButton />

                <span className="hidden items-center md:flex">
                  <UserButton />
                </span>
              </div>
            </div>
          </div>
        </NavbarCont>
      </IconThemeProvider>
    </DropdownProvider>
  );
}
