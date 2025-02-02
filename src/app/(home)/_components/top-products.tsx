import prisma from "@/lib/prisma";
import Slider from "@/components/slider";
import Link from "next/link";
import Image from "next/image";

export default async function TopProducts() {
  const products = await prisma.products.findMany({
    where: { quantity: { gt: 0 } },
    take: 7,
  });

  return (
    <section className="text-main">
      <header className="mb-5 flex items-end gap-4 px-cont-sm md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
        <h3 className="text-center text-3xl font-bold">Best Sellers</h3>
        <Link
          className="text-lg font-bold underline transition-colors hover:decoration-transparent"
          href="/shop"
        >
          View all
        </Link>
      </header>

      <Slider>
        {products.map((product) => (
          <div
            key={product.id}
            className="aspect-[4/5] min-w-[calc((100vw-1rem-(2*1rem)-3.75rem)/2)] md:min-w-[calc((100vw-2rem-(3*1rem)-3.75rem)/3)] lg:min-w-[calc((100vw-4rem-(4*1rem)-3.75rem)/4)] xl:min-w-[calc((100vw-5rem-(5*1rem)-4rem)/5)]"
          >
            <Link href={"/product/" + product.name} className="group text-sm">
              <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-md border-2 border-main">
                <Image
                  src={product.image_url}
                  fill
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
      </Slider>
    </section>
  );
}
