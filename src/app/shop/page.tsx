import prisma from "@/lib/prisma";
import { products } from "@prisma/client";
import Header from "@/app/shop/_components/header";
import Image from "next/image";

export default async function Shop(props: {
  searchParams?: Promise<{
    minimumPrice?: string;
    maximumPrice?: string;
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  //Number([|| undefined] means => if '' return undefined because Number('') = 0 and Number(undefined) = NaN)
  const minPrice = Number(searchParams?.minimumPrice || undefined);
  const maxPrice = Number(searchParams?.maximumPrice || undefined);
  const priceFilter: { gte?: number; lte?: number } = {};
  if (!Number.isNaN(minPrice)) priceFilter.gte = minPrice;
  if (!Number.isNaN(maxPrice)) priceFilter.lte = maxPrice;

  const selectedCategory = searchParams?.category;
  const categoryFilter: { name?: string } = {};
  if (selectedCategory) categoryFilter.name = selectedCategory;

  const products = await prisma.products.findMany({
    where: {
      price: priceFilter,
      category: categoryFilter,
    },
  });
  const productsCount = await prisma.products.count({});
  const highestPrice = Math.max(
    ...products.map((product) => Number(product.price)),
  );

  return (
    <main>
      <div className="mb-16 space-y-5 px-cont-sm text-main md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
        <h2 className="text-3xl font-semibold">All Products</h2>
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
}

function Card({ price, image_url, title }: products) {
  return (
    <div className="group flex aspect-[0.7] flex-col">
      <div className="round relative mb-2 h-[65%] overflow-hidden rounded-md border-2 border-main">
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw,(min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="underline-offset-2 group-hover:underline">{title}</div>
      <div>${price.toFixed(2)} USD</div>
      <button className="mt-auto rounded-3xl border-2 border-main py-2 transition-colors duration-200 group-hover:bg-main group-hover:text-background">
        Add to Cart
      </button>
    </div>
  );
}
