import Link from 'next/link';

export default function Hero() {
  return (
    <section className="flex flex-col items-center bg-red-200 text-center px-cont pt-32 min-h-[42rem]">
      <h3 className="text-4xl font-bold mb-3 max-w-[27ch]">
        Welcome to GreenHaven Market - Shop Sustainably
      </h3>
      <p className="max-w-[51ch] mb-10 text-lg">
        At GreenHaven Market, we believe in a sustainable future. Our mission is
        to provide eco-friendly products that empower you to make responsible
        choices for your home and planet.
      </p>
      <Link href="/shop" className="bg-white py-3 px-6 rounded-md text-lg">
        Shop Now!
      </Link>
    </section>
  );
}
