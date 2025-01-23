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
  const [cardWidth, setCardWidth] = useState(1);
  const [scrollsCount, setScrollsCount] = useState(1);
  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      const paddings = [16, 32, 64, 80];
      const gap = 16;
      const fixedVal = 16;

      let cardsCount = 1;
      if (windowWidth >= 1280) cardsCount = 4;
      else if (windowWidth >= 1024) cardsCount = 3;
      else if (windowWidth >= 768) cardsCount = 2;

      const newCardWidth =
        (windowWidth -
          paddings[cardsCount - 1] -
          cardsCount * gap -
          Math.max(paddings[cardsCount - 1] - fixedVal, 60)) /
        cardsCount;

      setCardWidth(newCardWidth);
      setScrollsCount(-cardsCount + 8);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    slider.addEventListener("scroll", () => {
      const cardWidth = slider.children[0]?.clientWidth || 0;
      const scrollAmount = slider.scrollLeft / cardWidth;
      setCurrentScroll(Math.round(scrollAmount));
    });
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
    <div className="">
      <div>
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-cont-sm pb-5 pt-4 scrollbar-hide *:snap-start md:scroll-px-8 md:px-cont-md lg:scroll-px-16 lg:px-cont-lg xl:scroll-px-20 xl:px-cont-xl"
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} cardWidth={cardWidth} />
          ))}
          <article
            style={{
              minWidth: cardWidth + "px",
              minHeight: (cardWidth * 5) / 4 + "px",
            }}
            className={``}
          >
            <Link
              href="/blog"
              className="group flex h-full items-center justify-center overflow-hidden rounded-2xl bg-[#F5F5E4] transition-all hover:scale-[1.03] hover:shadow-xl"
            >
              <p className="text-lg font-bold underline transition-colors hover:decoration-transparent">
                View All
              </p>
            </Link>
          </article>
        </div>
      </div>
      {/* arrows */}
      <div className="flex justify-center">
        <button
          onClick={() => scrollByOneSnap("left")}
          className="disabled:text-disabled transition-transform hover:scale-[1.1] disabled:scale-100 disabled:cursor-not-allowed"
          disabled={currentScroll + 1 === 1}
        >
          <MdKeyboardArrowLeft size={30} />
        </button>

        <div className="text-lg">
          {currentScroll + 1} / {scrollsCount}
        </div>

        <button
          onClick={() => scrollByOneSnap("right")}
          className="disabled:text-disabled transition-transform hover:scale-[1.1] disabled:scale-100 disabled:cursor-not-allowed"
          disabled={currentScroll + 1 === scrollsCount}
        >
          <MdKeyboardArrowRight size={30} />
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
}: Article & { cardWidth: number }) {
  return (
    <article
      style={{
        minWidth: cardWidth + "px",
        minHeight: (cardWidth * 5) / 4 + "px",
      }}
      className={``}
    >
      <Link
        href={`/article/${link}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[#F5F5E4] transition-all hover:scale-[1.03] hover:shadow-xl"
      >
        <Image
          src={imageURL}
          alt="article image"
          width="200"
          height="1"
          className="aspect-[2] w-full object-cover"
        />
        <div className="flex grow flex-col justify-between gap-5 p-8">
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
