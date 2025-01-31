"use client";
import { useRef, useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { createPortal } from "react-dom";
export default function PriceComponent({
  highestPrice,
}: {
  highestPrice: number;
}) {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [mini, setMini] = useState<number | "">(
    Number(searchParams.get("minimumPrice") || NaN) || "",
  );
  const [max, setMax] = useState<number | "">(
    Number(searchParams.get("maximumPrice") || NaN) || "",
  );
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const parentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setMini(Number(searchParams.get("minimumPrice") || NaN) || "");
    setMax(Number(searchParams.get("maximumPrice") || NaN) || "");
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePriceChange = useDebouncedCallback(
    (type: "minimum" | "maximum", value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(type + "Price", value);
      } else {
        params.delete(type + "Price");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  return (
    <div ref={parentRef}>
      <button
        onClick={() => {
          setIsOpen((e) => !e);
          if (!parentRef.current) return;
          const rect = parentRef.current.getBoundingClientRect();
          setPosition({
            top: rect.bottom + window.scrollY + 8,
            left: rect.left + window.scrollX,
          });
        }}
        className="group flex items-center underline-offset-2 hover:underline"
      >
        <span>Price</span>
        {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </button>
      {/*Drop down */}
      {isOpen &&
        createPortal(
          <div
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            className="absolute z-10 flex items-center border-2 border-main bg-background p-3"
            ref={dropdownRef}
          >
            <span className="mr-1">$</span>
            <input
              value={mini}
              onChange={(e) => {
                setMini(Number(e.target.value));
                handlePriceChange("minimum", e.target.value);
              }}
              id="minimum"
              placeholder="From"
              type="number"
              className="mr-3 h-7 w-20 rounded-2xl pl-2 placeholder:text-main-lightx focus-within:outline-none"
              min={0}
              max={max || highestPrice}
            />
            <span className="mr-1">$</span>
            <input
              value={max}
              onChange={(e) => {
                setMax(Number(e.target.value));
                handlePriceChange("maximum", e.target.value);
              }}
              id="maximum"
              placeholder="To"
              type="number"
              className="mr-3 h-7 w-20 rounded-2xl pl-2 text-main placeholder:text-main-lightx focus-within:outline-none"
              min={mini || 0}
              max={highestPrice}
            />
            <span className="absolute top-[-9px] size-4 rotate-45 border-l-2 border-t-2 border-main bg-inherit"></span>
          </div>,
          document.body,
        )}
    </div>
  );
}
