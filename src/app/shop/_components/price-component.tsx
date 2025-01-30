"use client";
import { useRef, useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { replace } = useRouter();

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

  function handlePriceChange(type: "minimum" | "maximum", value: string) {
    const params = new URLSearchParams(searchParams);

    if (type === "minimum") {
      setMini(Number(value));
    } else {
      setMax(Number(value));
    }
    if (value) {
      params.set(type + "Price", value);
    } else {
      params.delete(type + "Price");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen((e) => !e);
        }}
        className="group flex items-center underline-offset-2 hover:underline"
      >
        <span>Price</span>
        {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </button>
      {isOpen && (
        <div
          className="absolute top-[34px] z-10 flex items-center border-2 border-main bg-background p-3"
          ref={dropdownRef}
        >
          <span className="mr-1">$</span>
          <input
            value={mini}
            onChange={(e) => {
              handlePriceChange("minimum", e.target.value);
            }}
            id="minimum"
            placeholder="From"
            type="number"
            className="placeholder:text-main-lightx mr-3 h-7 w-20 rounded-2xl pl-2 focus-within:outline-none"
            min={0}
            max={max || highestPrice}
          />
          <span className="mr-1">$</span>
          <input
            value={max}
            onChange={(e) => {
              handlePriceChange("maximum", e.target.value);
            }}
            id="maximum"
            placeholder="To"
            type="number"
            className="placeholder:text-main-lightx mr-3 h-7 w-20 rounded-2xl pl-2 text-main focus-within:outline-none"
            min={mini || 0}
            max={highestPrice}
          />
          <span className="absolute top-[-9px] size-4 rotate-45 border-l-2 border-t-2 border-main bg-inherit"></span>
        </div>
      )}
    </div>
  );
}
