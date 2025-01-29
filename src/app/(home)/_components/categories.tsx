import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { categories } from "@prisma/client";

export default function Categories() {
  return (
    <section className="px-cont-sm py-20 text-lg text-main md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <h3 className="mb-3 text-center text-4xl font-semibold">
        Explore Our Eco-Friendly Product Categories
      </h3>
      <p className="mx-auto mb-10 max-w-[70ch] text-center">
        At GreenHaven Market, we offer a diverse range of sustainable products
        designed to enhance your eco-conscious lifestyle. Discover how our
        carefully curated selections contribute to a healthier planet.
      </p>
      <div className="m-auto w-fit">
        <CardsList />
        <div className="flex items-center gap-5">
          <Link
            href="/shop"
            className="bloc w-20 border-2 border-black px-3 py-2 text-center font-medium transition-colors hover:bg-main hover:text-white"
          >
            Shop
          </Link>
          <Link
            href="/blog"
            className="px-2 text-center transition-all hover:text-xl"
          >
            Learn more <MdKeyboardArrowRight className="inline-block" />
          </Link>
        </div>
      </div>
    </section>
  );
}

async function CardsList() {
  const categories = await prisma.categories.findMany();
  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-7">
      {categories.map((category) => (
        <Card key={category.category_id} {...category} />
      ))}
    </div>
  );
}

function Card({ title, description, name, image_url }: categories) {
  return (
    <article className="group mb-10 w-full min-w-44 max-w-[31.25rem] shrink grow basis-10">
      <Link href={`/${name}`}>
        <div className="relative mb-4 aspect-[2/1] overflow-hidden">
          <Image
            src={image_url}
            alt="card image"
            fill
            className={`rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.05] ${name === "skincare" ? "object-[50%_35%]" : ""}`}
            sizes="31.25rem"
          />
        </div>
        <div className="pr-2">
          <h4 className="text-xl font-semibold underline decoration-transparent transition-colors hover:underline group-hover:decoration-main">
            {title}
          </h4>
          <p className="text-base text-main-light">{description}</p>
        </div>
      </Link>
    </article>
  );
}
