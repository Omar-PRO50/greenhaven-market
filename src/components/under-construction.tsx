"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

export default function UnderConstruction() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center gap-10 p-cont-sm text-main md:p-cont-md lg:p-cont-lg xl:p-cont-xl">
      <h1 className="text-4xl font-bold">🚧 Site Under Development{dots}</h1>
      <p className="mt-2 text-lg text-gray-600">
        We&apos;re working hard to bring you something amazing. Check back soon!
      </p>
      <div className="mt-6 flex items-center justify-center space-x-4">
        <Link
          href="/"
          className="mt-6 rounded-full border-2 border-main px-6 py-3 text-lg font-semibold text-main transition-all duration-300 hover:bg-main hover:text-white"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
