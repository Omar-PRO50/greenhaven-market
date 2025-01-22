import Hero from "@/app/(home)/_components/hero";
import Categories from "@/app/(home)/_components/categories";
import Article from "@/app/(home)/_components/articles";

export default function Home() {
  return (
    <main className="home-page bg-background">
      <Hero />
      <section className="p-cont-sm md:p-cont-md lg:p-cont-lg xl:p-cont-xl bg-main text-center text-3xl font-semibold text-white">
        <h2 className="m-auto max-w-[49ch]">
          Our products are safe, minimal, and easy on the planet. They last when
          you need them, and biodegrade when you don’t.
        </h2>
      </section>
      <Categories />
      <Article />
    </main>
  );
}
