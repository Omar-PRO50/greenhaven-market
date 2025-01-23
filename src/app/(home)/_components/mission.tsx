import Image from "next/image";

export default function Mission() {
  return (
    <section className="flex flex-col items-center gap-8 bg-[#F5F5E4] px-cont-sm py-20 text-main md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <h3 className="text-3xl font-semibold">
        We raise the bar for what a sustainable product looks like
      </h3>
      <div className="flex gap-4">
        <Card
          imgURL="/placeholder.png"
          title="Beyond Single Use"
          content="We reduce the need for single-use plastic through sustainable versions of every day products."
        />
        <Card
          imgURL="/placeholder.png"
          title="Minimal, Natural Ingredients"
          content="All of our products are made with safe, non-toxic ingredients, most have only 5 natural ingredients or less!"
        />
        <Card
          imgURL="/placeholder.png"
          title="Circular Packaging"
          content="All of our packaging is 100% recyclable and most can be composted directly in your backyard!"
        />
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
    <div className="flex flex-1 flex-col items-center gap-4 overflow-hidden rounded-2xl border-2 border-main p-10 text-center">
      <Image src={imgURL} alt={title} width="100" height="1" className="" />
      <h4 className="font-semibold">{title}</h4>
      <p className="font-light">{content}</p>
    </div>
  );
}
