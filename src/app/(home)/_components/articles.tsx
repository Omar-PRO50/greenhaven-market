import Link from "next/link";
import articles from "@/data/articles.json";
import ArticlesSlider from "./articles-slider";

export default function Article() {
  return (
    <section className="px-cont-sm md:px-cont-md lg:px-cont-lg xl:px-cont-xl py-20 text-main">
      <header className="mb-5 flex items-end gap-4">
        <h3 className="text-center text-3xl font-bold">Latest Articles</h3>
        <Link
          className="text-2xl underline transition-colors hover:decoration-transparent"
          href="/blog"
        >
          View all
        </Link>
      </header>
      {/* slider */}
      <ArticlesSlider articles={articles} />
    </section>
  );
}
