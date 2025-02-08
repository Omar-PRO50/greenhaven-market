import Link from "next/link";
import { getLatestArticles } from "@/app/(home)/actions";

import Slider from "@/components/slider";
import Image from "next/image";
import FadeInWhenVisible from "@/components/animation/fadeInWhenVisible";
export default async function Articles() {
  const articles = await getLatestArticles();
  return (
    <section className="py-20 text-main">
      <FadeInWhenVisible>
        <header className="mb-5 flex items-end gap-4 px-cont-sm md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
          <h3 className="text-center text-3xl font-bold">Latest Articles</h3>
          <Link
            className="text-lg font-bold underline transition-colors hover:decoration-transparent"
            href="/blog"
          >
            View all
          </Link>
        </header>
      </FadeInWhenVisible>
      {/* slider */}

      <Slider>
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
        <ArticleCard isViewAll />
      </Slider>
    </section>
  );
}

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

type ArticleCardProps =
  | { isViewAll: true } // When isViewAll is true, no other props are required
  | (Pick<Article, "title" | "author" | "readTime" | "imageURL" | "link"> & {
      isViewAll?: false; // When isViewAll is false, all other props are required
    });

function ArticleCard(props: ArticleCardProps) {
  return (
    <article className="group flex aspect-[4/5] min-h-full min-w-[calc((100vw-1rem-(1*1rem)-3.75rem)/1)] overflow-hidden rounded-2xl bg-[#F5F5E4] transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-lg md:min-w-[calc((100vw-2rem-(2*1rem)-3.75rem)/2)] lg:min-w-[calc((100vw-4rem-(3*1rem)-3.75rem)/3)] xl:min-w-[calc((100vw-5rem-(4*1rem)-4rem)/4)]">
      <Link
        href={props.isViewAll ? "/blog" : `/blog/article/${props.link}`}
        className={`flex w-full flex-col ${
          props.isViewAll ? "items-center justify-center" : "flex-1"
        }`}
      >
        {props.isViewAll ? (
          <p className="text-lg font-bold underline transition-colors hover:decoration-transparent">
            View All
          </p>
        ) : (
          <>
            <div className="relative aspect-[2] w-full">
              <Image
                sizes="(min-width: 1280px) 25vw,(min-width: 1024px) 33vw,(min-width: 768px) 50vw,100vw"
                src={props.imageURL}
                alt="article image"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-5 p-8">
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
