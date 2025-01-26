import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

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

function CardsList() {
  const categoriesList = [
    {
      imageURL: "/placeholder.png",
      header: "Reusable Household Goods for Everyday Use",
      content: "Make a positive impact with our durable, reusable items.",
      categoryLink: "",
    },
    {
      imageURL: "/placeholder.png",
      header: "Organic Skincare for a Natural Glow",
      content: "Nourish your skin with our eco-friendly skincare line.",
      categoryLink: "",
    },
    {
      imageURL: "/placeholder.png",
      header: "Eco-Friendly Clothing for Sustainable Fashion",
      content: "Dress sustainably with our stylish, ethical apparel.",
      categoryLink: "",
    },
  ];

  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-7">
      {categoriesList.map((category, index) => (
        <Card key={index} {...category} />
      ))}
    </div>
  );
}

function Card({
  imageURL,
  header,
  content,
  categoryLink,
}: {
  imageURL: string;
  header: string;
  content: string;
  categoryLink: string;
}) {
  return (
    <article className="group mb-10 w-full min-w-44 max-w-[31.25rem] shrink grow basis-10">
      <Link href={categoryLink}>
        <div className="relative mb-4 aspect-[2/1]">
          <Image
            src={imageURL}
            alt="card image"
            fill
            className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        </div>
        <div className="pr-2">
          <h4 className="text-xl font-semibold underline decoration-transparent transition-colors group-hover:decoration-main">
            {header}
          </h4>
          <p className="text-base text-main-light">{content}</p>
        </div>
      </Link>
    </article>
  );
}
