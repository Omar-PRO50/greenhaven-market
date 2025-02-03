import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

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
    <main className="flex flex-col px-cont-sm py-10 md:flex-row md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <div className="relative aspect-square w-96 self-center overflow-hidden rounded-md border-2 border-main">
        <Image src={product.image_url} fill alt={product.title} />
      </div>

      <div></div>
    </main>
  );
}
