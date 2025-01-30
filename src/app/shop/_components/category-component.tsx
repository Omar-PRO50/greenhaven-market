"use client";
import { categories } from "@prisma/client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useState } from "react";

export default function CategoryComponent({
  categories,
}: {
  categories: Pick<categories, "category_id" | "name" | "title">[];
}) {
  // const [selectedCategory, setSelectedCategory] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSelect(value: string) {
    // setSelectedCategory(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <label
        htmlFor="category"
        className="mr-2 underline-offset-2 hover:underline"
      >
        Category:
      </label>
      <select
        defaultValue={searchParams.get("category")?.toString()}
        name="categories"
        id="category"
        className=""
        onChange={(e) => {
          handleSelect(e.target.value);
        }}
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.name}>
            {
              category.name
                .split("-") // Split the string by '-'
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
                .join(" ") // Join words with spaces
            }
          </option>
        ))}
      </select>
    </div>
  );
}
