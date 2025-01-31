"use client";
import { categories } from "@prisma/client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryComponent({
  categories,
}: {
  categories: Pick<categories, "category_id" | "name" | "title">[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );

  // Update selected category when search params change
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    setSelectedCategory(categoryParam || "");
  }, [searchParams]);

  function handleCategorySelect(value: string) {
    setSelectedCategory(value);
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
        value={selectedCategory} // Controlled component
        name="categories"
        id="category"
        className="bg-background"
        onChange={(e) => {
          handleCategorySelect(e.target.value);
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
