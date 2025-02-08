import UnderConstruction from "@/components/under-construction";

export default async function Page({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const post = (await params).post;
  console.log(post);
  if (true) return <UnderConstruction />;
  return <div>Blog page</div>;
}
