"use client";

import Image from "next/image";
import Link from "next/link";
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
  function handleArrowClick(type: "prev" | "next") {
    console.log(type);
    switch (type) {
      case "prev":
        break;
      case "next":
        break;
    }
  }

  return (
    <div>
      <div className="flex gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => handleArrowClick("prev")}>
          <MdKeyboardArrowLeft size={50} />
        </button>
        <button onClick={() => handleArrowClick("next")}>
          <MdKeyboardArrowRight size={50} />
        </button>
      </div>
    </div>
  );
}

function ArticleCard({ title, author, readTime, imageURL, link }: Article) {
  return (
    <article className="group aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-slate-200 transition-all hover:scale-[1.03] hover:shadow-xl">
      <Link href={`/article/${link}`} className="flex h-full flex-col">
        <Image
          src={imageURL}
          alt="article image"
          width="200"
          height="1"
          className="aspect-[2] w-full object-cover"
        />
        <div className="flex grow flex-col justify-between gap-5 p-4">
          <div className="">
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
