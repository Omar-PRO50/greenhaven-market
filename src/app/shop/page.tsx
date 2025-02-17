import Header from "@/app/shop/_components/header";
import Image from "next/image";
import Link from "next/link";
import CartBtn from "@/app/shop/_components/cart-btn";
import { StaggeredListInView } from "@/components/animation/staggeredList";
import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

type Sort = "price" | "name" | "id";
type Order = "asc" | "desc";
const validSortFields = new Set<Sort>(["price", "name", "id"]);

export default async function Page(props: {
  searchParams?: Promise<{
    minimumPrice?: string;
    maximumPrice?: string;
    category?: string;
    sort_by?: string;
    order?: string;
    show_outofstock?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  // Initialize Supabase client
  const supabase = await createClient();

  // Build query
  let query = supabase.from("products").select("*");
  let priceQuery = supabase.from("products").select("price");

  // Stock filter
  const showOutOfStock = searchParams?.show_outofstock === "true";
  if (!showOutOfStock) {
    query = query.gt("quantity", 0);
    priceQuery = priceQuery.gt("quantity", 0);
  }

  // Price filter
  const minPrice = Number(searchParams?.minimumPrice || undefined);
  const maxPrice = Number(searchParams?.maximumPrice || undefined);
  if (!Number.isNaN(minPrice)) {
    query = query.gte("price", minPrice);
    priceQuery = priceQuery.gte("price", minPrice);
  }
  if (!Number.isNaN(maxPrice)) {
    query = query.lte("price", maxPrice);
    priceQuery = priceQuery.lte("price", maxPrice);
  }

  // Category filter
  const selectedCategory = searchParams?.category;
  if (selectedCategory) {
    query = query.eq("category", selectedCategory);
    priceQuery = priceQuery.eq("category", selectedCategory);
  }

  //get highest price
  const { data: highestPriceRow, error: highestPriceError } = await priceQuery

    .order("price", { ascending: false }) // Sort by price in descending order
    .limit(1) // Fetch only the first row
    .maybeSingle(); // Expect a single row

  if (highestPriceError) {
    console.error("Error fetching highest price:", highestPriceError);
  }

  const highestPrice = highestPriceRow?.price || 0; // Default to 0 if no rows exist

  // Sorting
  const selectedSort = validSortFields.has(searchParams?.sort_by as Sort)
    ? (searchParams?.sort_by as Sort)
    : "id";
  const selectedOrder: Order = searchParams?.order === "desc" ? "desc" : "asc";
  query = query.order(selectedSort, { ascending: selectedOrder === "asc" });

  const { data: products, error } = await query;

  if (error) {
    console.log("Error fetching Porducts", error);
    return;
  }

  // Get total count (excluding price/category filters per original logic)
  let countQuery = supabase
    .from("products")
    .select("*", { count: "exact", head: true });
  if (!showOutOfStock) countQuery = countQuery.gt("quantity", 0);
  const { count: productsCount, error: countError } = await countQuery;

  if (countError) {
    console.log("Error counting Porducts", countError);
  }

  return (
    <main className="mb-16 px-cont-sm text-main md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <div className="mx-auto w-full max-w-max-screen-width space-y-5">
        <h2 className="text-3xl font-semibold">
          {selectedCategory
            ? selectedCategory
                .split("-") // Split the string by '-'
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
                .join(" ") // Join words with spaces
            : "All"}{" "}
          Products
        </h2>
        <section className="space-y-5">
          <Header
            filterProductsCount={products.length}
            productsCount={productsCount || 0}
            highestPrice={highestPrice}
          />
          <Products products={products} />
        </section>
      </div>
    </main>
  );
}

function Products({ products }: { products: Tables<"products">[] }) {
  return (
    <StaggeredListInView
      classNameParent="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      classNameChildren=""
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StaggeredListInView>
  );
}

function ProductCard({ product }: { product: Tables<"products"> }) {
  const { name, price, image_url, title, quantity } = product;
  const isOutOfStock = quantity === 0;

  return (
    <div
      className={`group flex aspect-[0.8] flex-col ${isOutOfStock ? "text-disabled" : ""}`}
    >
      <Link href={isOutOfStock ? "" : "/product/" + name} className="grow">
        <div className="relative mb-2 h-[80%] overflow-hidden rounded-md border-2 border-main">
          {isOutOfStock && (
            <div className="absolute left-2 top-2 z-10 rounded-md border-2 border-main bg-red-600 p-1 font-semibold text-white">
              OUT OF STOCK
            </div>
          )}
          <Image
            src={image_url}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${isOutOfStock ? "grayscale" : "group-hover:scale-105"}`}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw,(min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div
          className={`underline-offset-2 ${isOutOfStock ? "" : "group-hover:underline"}`}
        >
          {title}
        </div>
        <div>${price.toFixed(2)} USD</div>
      </Link>
      <CartBtn product={{ ...product, price: product.price }} />
    </div>
  );
}
