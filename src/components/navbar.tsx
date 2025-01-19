'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { RiCloseLargeFill } from 'react-icons/ri';
import { LuUserRound } from 'react-icons/lu';
import { IconContext } from 'react-icons';

export default function Navbar() {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <IconContext.Provider value={{ size: '25' }}>
      <nav className="relative bg-slate-400 px-11 grid grid-cols-[1fr_auto_1fr] items-center min-h-24">
        {isLarge ? (
          <div className="flex gap-6 text-xl">
            <Link href="/shop">Shop</Link>
            <Link href="/blog">Blog</Link>
          </div>
        ) : (
          <DropdownButton />
        )}
        <Link href="/">
          <Image
            className=""
            src="/logo.svg"
            alt="GreenHaven Market Logo"
            width="180"
            height="0"
          />
        </Link>
        <div className="flex justify-end gap-3">
          {isLarge && (
            <button>
              <LuUserRound />
            </button>
          )}
          <button>
            <MdOutlineShoppingBag />
          </button>
          <Link href="/cart">
            <IoSearch />
          </Link>
        </div>
      </nav>
    </IconContext.Provider>
  );
}

function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false);
  const Links = [
    { name: 'Blog', href: '/blog' },
    { name: 'Shop', href: '/shop' },
    { name: 'Log In', href: '/login' },
    { name: 'Sign Up', href: '/signup' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className="" onClick={toggleMenu}>
        <MenuIcon isOpen={isOpen} />
      </button>
      <ul
        className={`absolute top-full bg-slate-200 w-full block text-center transition-[max-height] duration-500 overflow-y-hidden ${
          isOpen ? 'max-h-64' : 'max-h-0'
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

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  const SharedCss =
    'absolute transition-opacity duration-300 top-1/2 -translate-y-1/2';
  return (
    <>
      <div
        className={`${SharedCss} flex flex-col justify-between w-6 h-5  ${
          !isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="block w-6 h-[2.5px] bg-black rounded-sm"></span>
        <span className="block w-6 h-[2.5px] bg-black rounded-sm"></span>
        <span className="block w-6 h-[2.5px] bg-black rounded-sm"></span>
      </div>

      <div className={`${SharedCss} ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <RiCloseLargeFill />
      </div>
    </>
  );
}
