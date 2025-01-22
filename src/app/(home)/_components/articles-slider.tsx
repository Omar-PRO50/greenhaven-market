"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
type Article = {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  imageURL: string;
  tags: string[];
  readTime: string;
  link: string;
};

export default function ArticlesSlider({ articles }: { articles: Article[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState("1px");
  useEffect(() => {
    function changeCardWidth() {
      const windowWidth = window.innerWidth;
      const paddings = [16, 32, 64, 80];
      const gap = 16;
      // const fixedVal = 64;
      let cardsCount = 1;
      if (windowWidth >= 1280) cardsCount = 4;
      else if (windowWidth >= 1024) cardsCount = 3;
      else if (windowWidth >= 768) cardsCount = 2;
      const cardWidth =
        (windowWidth -
          paddings[cardsCount - 1] -
          cardsCount * gap -
          (paddings[cardsCount - 1] - 16)) /
        cardsCount;
      setCardWidth(cardWidth + "px");
    }

    window.addEventListener("resize", changeCardWidth);
    changeCardWidth();
    return () => {
      window.removeEventListener("resize", changeCardWidth);
    };
  }, []);

  const scrollByOneSnap = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const cardWidth = slider.children[0]?.clientWidth || 0;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    slider.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div
        ref={sliderRef}
        className="px-cont-sm md:px-cont-md lg:px-cont-lg xl:px-cont-xl flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto pb-5 pt-4 *:snap-start md:scroll-px-8 lg:scroll-px-16 xl:scroll-px-20"
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} cardWidth={cardWidth} />
        ))}
      </div>
      {/* arrows */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => scrollByOneSnap("left")}
          className="transition-transform hover:scale-[1.1]"
        >
          <MdKeyboardArrowLeft size={50} />
        </button>
        <button
          onClick={() => scrollByOneSnap("right")}
          className="transition-transform hover:scale-[1.1]"
        >
          <MdKeyboardArrowRight size={50} />
        </button>
      </div>
    </div>
  );
}

function ArticleCard({
  title,
  author,
  readTime,
  imageURL,
  link,
  cardWidth,
}: Article & { cardWidth: string }) {
  return (
    <article style={{ minWidth: cardWidth }} className={``}>
      <Link
        href={`/article/${link}`}
        className="group flex aspect-[4/5] h-full flex-col overflow-hidden rounded-2xl bg-[#F5F5E4] transition-all hover:scale-[1.03] hover:shadow-xl"
      >
        <Image
          src={imageURL}
          alt="article image"
          width="200"
          height="1"
          className="aspect-[2] w-full object-cover"
        />
        <div className="flex grow flex-col justify-between gap-5 p-4">
          <div className="flex flex-col gap-3">
            <h4>{title}</h4>
            <p className="font-semibold">{author}</p>
          </div>

          <p className="w-fit rounded-lg bg-main px-5 py-1 text-white transition-all group-hover:bg-white group-hover:font-bold group-hover:text-main">
            {readTime}
          </p>
        </div>
      </Link>
    </article>
  );
}
