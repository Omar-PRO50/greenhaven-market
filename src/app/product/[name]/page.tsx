import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

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

  return <div>my product: {product.title}</div>;
}
