import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Image from 'next/image';

export default function Categories() {
  return (
    <section className="px-largeCont py-20 text-lg text-main">
      <h3 className="text-4xl font-semibold text-center mb-3">
        Explore Our Eco-Friendly Product Categories
      </h3>
      <p className="text-center  mb-10 max-w-[60ch] mx-auto">
        At GreenHaven Market, we offer a diverse range of sustainable products
        designed to enhance your eco-conscious lifestyle. Discover how our
        carefully curated selections contribute to a healthier planet.
      </p>
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
    </section>
  );
}

function CardsList() {
  const categoriesList = [
    {
      imageURL: '/placeholder.png',
      header: 'Reusable Household Goods for Everyday Use',
      content: 'Make a positive impact with our durable, reusable items.',
    },
    {
      imageURL: '/placeholder.png',
      header: 'Reusable Household Goods for Everyday Use',
      content: 'Make a positive impact with our durable, reusable items.',
    },
    {
      imageURL: '/placeholder.png',
      header: 'Reusable Household Goods for Everyday Use',
      content: 'Make a positive impact with our durable, reusable items.',
    },
    {
      imageURL: '/placeholder.png',
      header: 'Reusable Household Goods for Everyday Use',
      content: 'Make a positive impact with our durable, reusable items.',
    },
  ];

  return (
    <div className={`flex gap-4 flex-wrap justify-center`}>
      {categoriesList.map(({ imageURL, header, content }, i) => (
        <Card key={i} imageURL={imageURL} header={header} content={content} />
      ))}
    </div>
  );
}

function Card({
  imageURL,
  header,
  content,
}: {
  imageURL: string;
  header: string;
  content: string;
}) {
  return (
    <article className="shrink grow basis-10 min-w-44 max-w-96 mb-10">
      <div>
        <Image
          src={imageURL}
          alt="card image"
          width="100"
          height="0"
          className="w-full mb-4"
        />
      </div>
      <div className="">
        <h4 className="text-xl font-semibold">{header}</h4>
        <p className="text-base text-main-light">{content}</p>
      </div>
    </article>
  );
}
