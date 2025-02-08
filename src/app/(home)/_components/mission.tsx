import FadeInWhenVisible from "@/components/animation/fadeInWhenVisible";
import Image from "next/image";

const MISSION_CARDS = [
  {
    id: 0,
    imgURL: "/mission/globe.png",
    title: "Beyond Single Use",
    content:
      "We reduce the need for single-use plastic through sustainable versions of every day products.",
  },
  {
    id: 1,
    imgURL: "/mission/leaves.png",
    title: "Minimal, Natural Ingredients",
    content:
      "All of our products are made with safe, non-toxic ingredients, most have only 5 natural ingredients or less!",
  },
  {
    id: 2,
    imgURL: "/mission/cycle.png",
    title: "Circular Packaging",
    content:
      "All of our packaging is 100% recyclable and most can be composted directly in your backyard!",
  },
];

export default function Mission() {
  return (
    <section className="flex flex-col items-center gap-8 bg-[#F5F5E4] px-cont-sm py-20 text-main md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <FadeInWhenVisible>
        <h3 className="text-3xl font-semibold">
          We raise the bar for what a sustainable product looks like
        </h3>
      </FadeInWhenVisible>
      <div className="flex flex-col gap-4 lg:flex-row">
        {MISSION_CARDS.map(({ id, ...cardProps }) => (
          <Card key={id} {...cardProps} />
        ))}
      </div>
    </section>
  );
}

function Card({
  imgURL,
  title,
  content,
}: {
  imgURL: string;
  title: string;
  content: string;
}) {
  return (
    <FadeInWhenVisible className="flex-1">
      <div className="flex flex-col items-center gap-4 overflow-hidden rounded-2xl border-2 border-main p-10 text-center">
        <Image src={imgURL} alt={title} width="70" height="70" />
        <h4 className="font-semibold">{title}</h4>
        <p className="font-light">{content}</p>
      </div>
    </FadeInWhenVisible>
  );
}
