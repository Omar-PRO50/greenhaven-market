import SortbyComponent from "./sortby-component";
import prisma from "@/lib/prisma";
import FiltersComponent from "./filters-component";

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
        <span>
          {filterProductsCount === productsCount
            ? ""
            : filterProductsCount + " of "}
          {productsCount} Products
        </span>
        <SortbyComponent />
      </div>
      <FiltersComponent categories={categories} highestPrice={highestPrice} />
    </div>
  );
}
