import Hero from "@/app/(home)/_components/hero";
import Categories from "@/app/(home)/_components/categories";
import Articles from "@/app/(home)/_components/articles";
import Mission from "@/app/(home)/_components/mission";
import TopProducts from "./_components/top-products";
import FadeInWhenVisible from "@/components/animation/fadeInWhenVisible";

export default async function Page() {
  return (
    <main className="">
      <Hero />
      <section className="bg-main px-cont-sm py-10 text-center text-3xl font-semibold text-white md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
        <FadeInWhenVisible>
          <h2 className="m-auto max-w-[49ch]">
            Our products are safe, minimal, and easy on the planet. They last
            when you need them, and biodegrade when you don’t.
          </h2>
        </FadeInWhenVisible>
      </section>
      <TopProducts />
      <Categories />
      <Articles />
      <Mission />
    </main>
  );
}
