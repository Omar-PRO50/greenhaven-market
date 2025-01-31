"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ShowOutofstockComponent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isChecked, setIsChecked] = useState(
    searchParams.get("show_outofstock") === "true",
  );
  useEffect(() => {
    setIsChecked(searchParams.get("show_outofstock") === "true");
  }, [searchParams]);

  const handleCheck = useDebouncedCallback((check: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (check) {
      params.set("show_outofstock", "true");
    } else {
      params.delete("show_outofstock");
    }
    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <div className="flex space-x-1">
      {/* Checkmark */}
      <div className="relative size-5 self-center">
        <input
          type="checkbox"
          value=""
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
            handleCheck(e.target.checked);
          }}
          className="peer absolute inset-0 z-10 size-full self-center opacity-0"
        />

        <div className="relative size-full rounded-md border-2 border-main transition-all duration-200 peer-checked:bg-main">
          <svg
            className={`absolute inset-0 h-full w-full text-background transition-opacity duration-200 ${isChecked ? "opacity-100" : "opacity-0"} `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <label htmlFor="terms" className="">
        Show Out Of Stock Products
      </label>
    </div>
  );
}
