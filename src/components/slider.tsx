"use client";
import { motion } from "framer-motion";

import { Children, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import FadeInWhenVisible from "./animation/fadeInWhenVisible";
import StaggeredList from "./animation/staggeredList";

export default function Slider({ children }: { children: React.ReactNode }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollsCount, setScrollsCount] = useState(1);
  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    function handleResize() {
      const slider = sliderRef.current;
      if (!slider) return;
      const windowWidth = window.innerWidth;
      const rootFontSize = parseFloat(
        window.getComputedStyle(document.documentElement).fontSize,
      );
      const cardWidth = slider.children[0]?.clientWidth || 0;

      //defualt in rem
      let padding = 1;
      //xl:
      if (windowWidth >= 1280) padding = 5;
      //lg:
      else if (windowWidth >= 1024) padding = 4;
      //md
      else if (windowWidth >= 768) padding = 2;

      const cardsCount =
        (windowWidth / rootFontSize - padding - Math.max(padding - 1, 3.75)) /
        (cardWidth / rootFontSize + 1);

      setScrollsCount(
        Math.round(
          (sliderRef.current?.childElementCount || 1) - cardsCount + 1,
        ),
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
      <StaggeredList
        ref={sliderRef}
        classNameParent="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-cont-sm pb-10 pt-8 scrollbar-hide *:snap-start md:scroll-px-8 md:px-cont-md lg:scroll-px-16 lg:px-cont-lg xl:scroll-px-20 xl:px-cont-xl"
        classNameChildren=""
      >
        {children}
      </StaggeredList>

      {/* arrows */}
      <FadeInWhenVisible>
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
      </FadeInWhenVisible>
    </div>
  );
}
