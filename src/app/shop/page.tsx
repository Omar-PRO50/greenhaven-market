import prisma from "@/lib/prisma";
import { products } from "@prisma/client";
import Header from "@/app/shop/_components/header";
import Image from "next/image";
import Link from "next/link";
import CartBtn from "@/app/shop/_components/cart-btn";
import StaggeredList from "@/components/animation/staggeredList";

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

  const selectedSort = searchParams?.sort_by || "";
  const selectedOrder: Order = searchParams?.order !== "desc" ? "asc" : "desc";
  const orderOption: Partial<Record<Sort, Order>> = {};
  if (selectedSort && validSortFields.has(selectedSort as Sort))
    orderOption[selectedSort as Sort] = selectedOrder;
  else orderOption.id = selectedOrder;

  //Number([|| undefined] means => if '' return undefined because Number('') = 0 and Number(undefined) = NaN)
  const minPrice = Number(searchParams?.minimumPrice || undefined);
  const maxPrice = Number(searchParams?.maximumPrice || undefined);
  const priceFilter: { gte?: number; lte?: number } = {};
  if (!Number.isNaN(minPrice)) priceFilter.gte = minPrice;
  if (!Number.isNaN(maxPrice)) priceFilter.lte = maxPrice;

  const selectedCategory = searchParams?.category;
  const categoryFilter: { name?: string } = {};
  if (selectedCategory) categoryFilter.name = selectedCategory;

  const show_outofstock = searchParams?.show_outofstock || "";
  const outofstockOption: { gt?: 0 } = {};
  if (show_outofstock !== "true") outofstockOption.gt = 0;

  const products = await prisma.products.findMany({
    where: {
      price: priceFilter,
      category: categoryFilter,
      quantity: outofstockOption,
    },
    orderBy: orderOption,
  });
  const productsCount = await prisma.products.count({
    where: { quantity: outofstockOption },
  });
  const highestPrice = Math.max(
    ...products.map((product) => Number(product.price)),
  );

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
            productsCount={productsCount}
            highestPrice={highestPrice}
          />
          <Products products={products} />
        </section>
      </div>
    </main>
  );
}

function Products({ products }: { products: products[] }) {
  return (
    <StaggeredList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StaggeredList>
  );
}

function ProductCard({ product }: { product: products }) {
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
      <CartBtn product={{ ...product, price: product.price.toNumber() }} />
    </div>
  );
}
