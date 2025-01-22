import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-cont-sm md:px-cont-md lg:px-cont-lg xl:px-cont-xl flex min-h-[42rem] flex-col items-center pt-32 text-center text-main">
      <h3 className="mb-3 max-w-[27ch] text-4xl font-bold">
        Welcome to GreenHaven Market - Shop Sustainably
      </h3>
      <p className="mb-10 max-w-[51ch] text-lg">
        At GreenHaven Market, we believe in a sustainable future. Our mission is
        to provide eco-friendly products that empower you to make responsible
        choices for your home and planet.
      </p>
      <Link
        href="/shop"
        className="rounded-md border-2 border-main px-5 py-2 text-lg transition-all hover:bg-main hover:text-white"
      >
        Shop Now!
      </Link>
    </section>
  );
}
