import { notFound } from "next/navigation";
import Product from "@/app/product/_components/product";
import MayLike from "../_components/may-like";
import { createClient } from "@/utils/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const supabase = await createClient();
  const name = (await params).name;
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("name", name)
    .maybeSingle();

  //when to reject the product
  if (error) {
    console.log("Error finding product", error);
    notFound();
  }
  if (!product) {
    console.log("product doenst exist");
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
