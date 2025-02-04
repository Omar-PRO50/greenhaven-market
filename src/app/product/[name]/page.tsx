import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Product from "@/app/product/_components/product";
import MayLike from "../_components/may-like";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;
  const product = await prisma.products.findUnique({ where: { name: name } });

  //when to reject the product
  if (!product) {
    notFound();
  }

  return (
    <main className="px-cont-sm py-10 text-main md:flex-row md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <div className="mx-auto flex max-w-max-screen-width flex-col gap-10">
        <Product product={product} />
        <MayLike productId={product.id} categoryId={product.category_id} />
      </div>
    </main>
  );
}
