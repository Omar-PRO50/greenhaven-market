"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiSortAsc } from "react-icons/ri";
import { useDebouncedCallback } from "use-debounce";

export default function SortbyComponent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sort_by") || "",
  );
  const [isAsc, setIsAsc] = useState(searchParams.get("order") !== "desc");

  // Update selected sort when search params change
  useEffect(() => {
    setSelectedSort(searchParams.get("sort_by") || "");
    setIsAsc(searchParams.get("order") !== "desc");
  }, [searchParams]);

  function handleSortSelect(value: string) {
    setSelectedSort(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort_by", value);
    } else {
      params.delete("sort_by");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleOrderChange = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (isAsc) {
      params.set("order", "asc");
    } else {
      params.set("order", "desc");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  return (
    <div>
      <label htmlFor="sort" className="mr-2 underline-offset-2 hover:underline">
        Sort By:
      </label>
      <select
        className="bg-background"
        value={selectedSort} // Controlled component
        id="sort"
        name="sort-by"
        onChange={(e) => {
          handleSortSelect(e.target.value);
        }}
      >
        <option value="">Featured</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
      <button
        className="transition-transform duration-300 hover:scale-110"
        onClick={() => {
          setIsAsc((b) => !b);
          handleOrderChange();
        }}
      >
        <RiSortAsc className={`size-5 ${isAsc ? "" : "-scale-y-100"}`} />
      </button>
    </div>
  );
}
