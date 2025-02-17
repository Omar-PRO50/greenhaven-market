import StaggeredList from "@/components/animation/staggeredList";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function MayLike({
  productId,
  categoryId,
}: {
  productId: number;
  categoryId: number;
}) {
  const supabase = await createClient();
  const { data: mayLikeProducts, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .neq("id", productId)
    .limit(4);

  if (error) {
    console.error("Error fetching related products:", error);
    return;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl">You may also like</h2>
      <StaggeredList
        classNameParent="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-4"
        classNameChildren=""
      >
        {mayLikeProducts.map((product) => (
          <div key={product.id} className="">
            <Link href={"/product/" + product.name} className="group text-sm">
              <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-md border-2 border-main">
                <Image
                  src={product.image_url}
                  fill
                  sizes="(min-width: 768px) 25vw ,50vw"
                  alt={product.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h5 className="group-hover:underline">{product.title}</h5>
              <div className="font-semibold">
                ${product.price.toFixed(2)} USD
              </div>
            </Link>
          </div>
        ))}
      </StaggeredList>
    </div>
  );
}
