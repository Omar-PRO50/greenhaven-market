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
  const [scrollsCount, setScrollsCount] = useState(1);
  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      //defualt
      let cardsCount = 1;
      //xl:
      if (windowWidth >= 1280) cardsCount = 4;
      //lg:
      else if (windowWidth >= 1024) cardsCount = 3;
      //md
      else if (windowWidth >= 768) cardsCount = 2;

      setScrollsCount(
        -cardsCount + 1 + (sliderRef.current?.childElementCount || 1),
      );
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;
    function handleScroll() {
      const cardWidth = slider.children[0]?.clientWidth || 0;
      const scrollAmount = slider.scrollLeft / cardWidth;
      setCurrentScroll(Math.round(scrollAmount));
    }
    const slider = sliderRef.current;
    slider.addEventListener("scroll", handleScroll);
    return () => {
      slider.removeEventListener("scroll", handleScroll);
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
    <div className="">
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-cont-sm pb-10 pt-4 scrollbar-hide *:snap-start md:scroll-px-8 md:px-cont-md lg:scroll-px-16 lg:px-cont-lg xl:scroll-px-20 xl:px-cont-xl"
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
        <ArticleCard isViewAll />
      </div>

      {/* arrows */}
      <div className="flex justify-center">
        <button
          name="slider-next"
          aria-label="Next slide"
          onClick={() => scrollByOneSnap("left")}
          className="transition-transform hover:scale-[1.1] disabled:scale-100 disabled:cursor-not-allowed disabled:text-disabled"
          disabled={currentScroll + 1 === 1}
        >
          <MdKeyboardArrowLeft size={30} />
        </button>

        <div className="text-lg">
          {currentScroll + 1} / {scrollsCount}
        </div>

        <button
          name="slider-prev"
          aria-label="Previous slide"
          onClick={() => scrollByOneSnap("right")}
          className="transition-transform hover:scale-[1.1] disabled:scale-100 disabled:cursor-not-allowed disabled:text-disabled"
          disabled={currentScroll + 1 === scrollsCount}
        >
          <MdKeyboardArrowRight size={30} />
        </button>
      </div>
    </div>
  );
}

type ArticleCardProps =
  | { isViewAll: true } // When isViewAll is true, no other props are required
  | (Pick<Article, "title" | "author" | "readTime" | "imageURL" | "link"> & {
      isViewAll?: false; // When isViewAll is false, all other props are required
    });

function ArticleCard(props: ArticleCardProps) {
  return (
    <article className="min-h-article-card md:min-h-md-article-card lg:min-h-lg-article-card xl:min-h-xl-article-card min-w-article-card md:min-w-md-article-card lg:min-w-lg-article-card xl:min-w-xl-article-card group overflow-hidden rounded-2xl bg-[#F5F5E4] transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-lg">
      <Link
        href={props.isViewAll ? "/blog" : `/blog/article/${props.link}`}
        className={`flex h-full w-full flex-col ${props.isViewAll ? "items-center justify-center" : ""}`}
      >
        {props.isViewAll ? (
          <p className="text-lg font-bold underline transition-colors hover:decoration-transparent">
            View All
          </p>
        ) : (
          <>
            <div className="relative aspect-[2] w-full">
              <Image
                src={props.imageURL}
                alt="article image"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex grow flex-col justify-between gap-5 p-8">
              <div className="flex flex-col gap-3">
                <h4>{props.title}</h4>
                <p className="font-semibold">{props.author}</p>
              </div>

              <p className="w-fit rounded-lg bg-main px-5 py-1 text-white transition-all group-hover:bg-white group-hover:font-bold group-hover:text-main">
                {props.readTime}
              </p>
            </div>
          </>
        )}
      </Link>
    </article>
  );
}
