import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Image from 'next/image';

export default function Categories() {
  return (
    <section className="p-cont bg-cyan-200">
      <h3 className="text-4xl font-semibold text-center mb-3">
        Explore Our Eco-Friendly Product Categories
      </h3>
      <p className="text-center text-lg mb-10 max-w-[60ch] mx-auto">
        At GreenHaven Market, we offer a diverse range of sustainable products
        designed to enhance your eco-conscious lifestyle. Discover how our
        carefully curated selections contribute to a healthier planet.
      </p>
      <CardsList />
      <Link href="/shop">Shop</Link>
      <Link href="">
        Learn more <MdKeyboardArrowRight />
      </Link>
    </section>
  );
}

function CardsList() {
  const ProductsList = [
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
    {
      imageURL: '/placeholder.png',
      header: 'Reusable Household Goods for Everyday Use',
      content: 'Make a positive impact with our durable, reusable items.',
    },
  ];

  return (
    <div className={`flex gap-4 flex-wrap justify-center`}>
      {ProductsList.map(({ imageURL, header, content }, i) => (
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
    <article className="shrink grow basis-10 min-w-44 max-w-72">
      <div>
        <Image
          src={imageURL}
          alt="card image"
          width="100"
          height="0"
          className="w-full"
        />
      </div>
      <div className="">
        <h4 className="text-xl font-semibold">{header}</h4>
        <p className="text-lg">{content}</p>
      </div>
    </article>
  );
}
