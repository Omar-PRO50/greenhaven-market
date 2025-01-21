import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Image from 'next/image';

export default function Categories() {
  return (
    <section className="px-largeCont py-20 text-lg text-main">
      <h3 className="text-4xl font-semibold text-center mb-3">
        Explore Our Eco-Friendly Product Categories
      </h3>
      <p className="text-center  mb-10 max-w-[70ch] mx-auto">
        At GreenHaven Market, we offer a diverse range of sustainable products
        designed to enhance your eco-conscious lifestyle. Discover how our
        carefully curated selections contribute to a healthier planet.
      </p>
      <div className="w-fit m-auto">
        <CardsList />
        <div className="flex items-center gap-5">
          <Link
            href="/shop"
            className="px-3 py-2 border-2 border-black font-medium w-20 bloc text-center hover:bg-main hover:text-white transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/blog"
            className="transition-all hover:text-xl text-center px-2"
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
      imageURL: '/placeholder.png',
      header: 'Reusable Household Goods for Everyday Use',
      content: 'Make a positive impact with our durable, reusable items.',
      categoryLink: '',
    },
    {
      imageURL: '/placeholder.png',
      header: 'Reusable Household Goods for Everyday Use',
      content: 'Make a positive impact with our durable, reusable items.',
      categoryLink: '',
    },
    {
      imageURL: '/placeholder.png',
      header: 'Reusable Household Goods for Everyday Use',
      content: 'Make a positive impact with our durable, reusable items.',
      categoryLink: '',
    },
  ];

  return (
    <div className="flex lg:gap-7 lg:flex-row flex-col items-center">
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
    <article className="shrink grow basis-10 min-w-44 mb-10 max-w-[31.25rem] group hover:scale-[1.01] transition-transform">
      <Link href={categoryLink}>
        <div className="w-full aspect-[2/1] rounded-lg mb-4 overflow-hidden">
          <Image
            src={imageURL}
            alt="card image"
            width="100"
            height="0"
            className=" object-cover w-full h-full transition-transform group-hover:scale-[1.03]"
          />
        </div>
        <div className="pr-2">
          <h4 className="text-xl font-semibold group-hover:underline">
            {header}
          </h4>
          <p className="text-base text-main-light">{content}</p>
        </div>
      </Link>
    </article>
  );
}
