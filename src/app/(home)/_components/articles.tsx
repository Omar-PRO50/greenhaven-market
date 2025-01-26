import Link from "next/link";
import { getLatestArticles } from "@/app/actions";
import ArticlesSlider from "./articles-slider";

export default async function Articles() {
  const articles = await getLatestArticles();
  return (
    <section className="py-20 text-main">
      <header className="mb-5 flex items-end gap-4 px-cont-sm md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
        <h3 className="text-center text-3xl font-bold">Latest Articles</h3>
        <Link
          className="text-lg font-bold underline transition-colors hover:decoration-transparent"
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
