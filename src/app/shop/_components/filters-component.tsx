"use client";
import PriceComponent from "./filters/price-component";
import CategoryComponent from "./filters/category-component";
import ShowOutofstockComponent from "./filters/show-outofstock-component";
import { MdKeyboardArrowDown } from "react-icons/md";
import { categories } from "@prisma/client";
import { useState } from "react";
import CancelFiltersandSort from "./cancel-filters-and-sort";

export default function FiltersComponent({
  categories,
  highestPrice,
}: {
  categories: Pick<categories, "category_id" | "name" | "title">[];
  highestPrice: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="overflow-y-hidden rounded-md border-2 border-main px-2 pb-2 pt-1"
      style={{ height: isOpen ? "auto" : "38px" }}
    >
      <button
        className="flex text-lg font-semibold"
        onClick={() => setIsOpen((o) => !o)}
      >
        Filters <MdKeyboardArrowDown className="size-5 self-center" />
      </button>

      <div className="mb-2 flex flex-wrap gap-2 [&>div]:flex-none">
        <PriceComponent highestPrice={highestPrice} />
        <CategoryComponent categories={categories} />
        <ShowOutofstockComponent />
      </div>
      <CancelFiltersandSort highestPrice={highestPrice} />
    </div>
  );
}
