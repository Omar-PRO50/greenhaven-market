import SortbyComponent from "./sortby-component";
import FiltersComponent from "./filters-component";
import { createClient } from "@/utils/supabase/server";

export default async function Header({
  productsCount,
  filterProductsCount,
  highestPrice,
}: {
  productsCount: number;
  filterProductsCount: number;
  highestPrice: number;
}) {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("name, title, category_id");
  if (error) {
    console.log("Error fetching categories in filter", error);
  }
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
      <FiltersComponent categories={categories!} highestPrice={highestPrice} />
    </div>
  );
}
