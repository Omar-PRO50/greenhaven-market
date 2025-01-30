"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SortbyComponent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSortSelect(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort_by", value);
    } else {
      params.delete("sort_by");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <label htmlFor="sort" className="mr-2 underline-offset-2 hover:underline">
        Sort By:
      </label>
      <select
        defaultValue={searchParams.get("sort_by")?.toString()}
        id="sort"
        name="sort-by"
        onChange={(e) => {
          handleSortSelect(e.target.value);
        }}
      >
        <option value="">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  );
}
