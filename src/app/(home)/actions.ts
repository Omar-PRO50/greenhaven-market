import articles from "@/data/articles.json";

export async function getLatestArticles() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay
  return articles;
}
