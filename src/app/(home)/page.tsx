import Hero from "@/app/(home)/_components/hero";
import Categories from "@/app/(home)/_components/categories";
import Article from "@/app/(home)/_components/articles";
import Mission from "@/app/(home)/_components/mission";
import prisma from "@/lib/prisma";

async function main() {
  const allProducts = await prisma.products.findMany();
  console.log(allProducts);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default async function Home() {
  main();
  return (
    <main className="">
      <Hero />
      <section className="bg-main p-cont-sm text-center text-3xl font-semibold text-white md:p-cont-md lg:p-cont-lg xl:p-cont-xl">
        <h2 className="m-auto max-w-[49ch]">
          Our products are safe, minimal, and easy on the planet. They last when
          you need them, and biodegrade when you don’t.
        </h2>
      </section>
      <Categories />
      <Article />
      <Mission />
    </main>
  );
}
