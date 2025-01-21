import Hero from '@/app/(home)/_components/hero';
import Categories from '@/app/(home)/_components/categories';
import Blogs from '@/app/(home)/_components/blogs';

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <section className="text-center p-largeCont text-3xl font-semibold">
        <h2 className="max-w-[49ch] m-auto">
          Our products are safe, minimal, and easy on the planet. They last when
          you need them, and biodegrade when you don’t.
        </h2>
      </section>
      <Categories />
      <Blogs />
    </main>
  );
}
