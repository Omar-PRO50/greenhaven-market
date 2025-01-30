// import { useSearchParams } from "next/navigation"
import { VscSettings } from "react-icons/vsc";
import PriceComponent from "./price-component";
import CategoryComponent from "./category-component";
import SortbyComponent from "./sortby-component";
import prisma from "@/lib/prisma";

export default async function Header({
  productsCount,
  filterProductsCount,
  highestPrice,
}: {
  productsCount: number;
  filterProductsCount: number;
  highestPrice: number;
}) {
  const categories = await prisma.categories.findMany({
    select: { name: true, title: true, category_id: true },
  });

  return (
    <div className="flex items-center justify-between">
      {/*small devices: Drop down*/}
      <button className="xsm:hidden">
        <VscSettings className="size-5 -scale-x-100" />
      </button>
      {/*Large devices: normal */}
      <div className="hidden gap-2 xsm:flex">
        <PriceComponent highestPrice={highestPrice} />
        <CategoryComponent categories={categories} />
      </div>
      <div className="flex gap-2">
        {/*Sort by */}
        <SortbyComponent />
        <span>
          {filterProductsCount === productsCount
            ? ""
            : filterProductsCount + " of "}
          {productsCount} Products
        </span>
      </div>
    </div>
  );
}
