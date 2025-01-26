import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="relative flex min-h-[42rem] flex-col items-center bg-[#d3ccbc] px-cont-sm pt-32 text-center text-main md:bg-transparent md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
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
      <Image
        src="/hero-image.jpg"
        alt="Background"
        sizes="100vw"
        fill
        className="-z-10 hidden -scale-x-100 object-cover object-center brightness-[1.4] md:block"
        priority
        quality={100}
      />
    </section>
  );
}
