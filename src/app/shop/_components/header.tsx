// import { useSearchParams } from "next/navigation"
import { VscSettings } from "react-icons/vsc";
import PriceComponent from "./filters/price-component";
import CategoryComponent from "./filters/category-component";
import SortbyComponent from "./sortby-component";
import prisma from "@/lib/prisma";
import CancelFiltersandSort from "./cancel-filters-and-sort";
import ShowOutofstockComponent from "./filters/show-outofstock-component";

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
    <div className="space-y-2">
      <div className="flex justify-between">
        {/*small devices: Drop down*/}
        <button className="xsm:hidden">
          <VscSettings className="size-5 -scale-x-100" />
        </button>
        {/*Large devices: normal */}
        <div className="hidden flex-wrap gap-2 xsm:flex">
          <PriceComponent highestPrice={highestPrice} />
          <CategoryComponent categories={categories} />
          <ShowOutofstockComponent />
        </div>
        <div className="flex min-w-fit gap-2">
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
      <CancelFiltersandSort highestPrice={highestPrice} />
    </div>
  );
}
