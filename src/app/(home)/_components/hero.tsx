import Link from "next/link";
import Image from "next/image";
import FadeInWhenVisible from "@/components/animation/fadeInWhenVisible";
export default function Hero() {
  return (
    <section className="relative flex min-h-[40rem] flex-col items-center px-cont-sm pt-28 text-center text-main md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <FadeInWhenVisible>
        <h3 className="mb-3 max-w-[27ch] text-4xl font-bold">
          Welcome to GreenHaven Market - Shop Sustainably
        </h3>
        <p className="mb-10 max-w-[51ch] text-lg">
          At GreenHaven Market, we believe in a sustainable future. Our mission
          is to provide eco-friendly products that empower you to make
          responsible choices for your home and planet.
        </p>
        <Link
          href="/shop"
          className="rounded-md border-2 border-main bg-background px-5 py-2 text-lg transition-all hover:bg-main hover:text-white"
        >
          Shop Now!
        </Link>
      </FadeInWhenVisible>

      <div className="absolute inset-0 -z-10">
        <Image
          sizes="100vw"
          src="/hero-image.jpg"
          alt="Background"
          fill
          className="object-cover brightness-[1.4]"
          priority
          quality={100}
        />
      </div>
    </section>
  );
}
