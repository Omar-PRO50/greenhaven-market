import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import FadeInWhenVisible from "@/components/animation/fadeInWhenVisible";
import { StaggeredListInView } from "@/components/animation/staggeredList";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/database.types";

export default function Categories() {
  return (
    <section className="px-cont-sm py-20 text-lg text-main md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <div className="mx-auto w-full max-w-max-screen-width">
        <FadeInWhenVisible>
          <h3 className="mb-3 text-4xl font-semibold">
            Explore Our Eco-Friendly Product Categories
          </h3>
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <p className="mb-10 max-w-[70ch]">
            At GreenHaven Market, we offer a diverse range of sustainable
            products designed to enhance your eco-conscious lifestyle. Discover
            how our carefully curated selections contribute to a healthier
            planet.
          </p>
        </FadeInWhenVisible>

        <div className=" ">
          <CardsList />
          <div className="flex items-center gap-5">
            <Link
              href="/shop"
              className="w-20 border-2 border-black px-3 py-2 text-center font-medium transition-colors hover:bg-main hover:text-white"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="px-2 text-center transition-all hover:text-xl"
            >
              Learn more <MdKeyboardArrowRight className="inline-block" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

async function CardsList() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    console.log("Error fetching Categories List", error);
    return;
  }

  return (
    <StaggeredListInView
      classNameParent="flex flex-col items-center lg:flex-row lg:items-start lg:gap-7"
      classNameChildren="group mb-10 w-full max-w-lg flex-1 lg:max-w-full"
    >
      {categories.map((category) => (
        <Card key={category.category_id} {...category} />
      ))}
    </StaggeredListInView>
  );
}

function Card({ title, description, name, image_url }: Tables<"categories">) {
  return (
    <article className="">
      <Link href={`/shop/?category=${name}`}>
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
