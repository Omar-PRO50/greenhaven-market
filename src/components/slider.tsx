"use client";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function Slider({ children }: { children: React.ReactNode }) {
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
    const slider = sliderRef.current;
    if (!slider) return;
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
        {children}
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
