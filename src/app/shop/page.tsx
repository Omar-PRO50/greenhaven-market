export default function Shop() {
  return (
    <div className="flex h-screen gap-2">
      <Card />
      <Card />
      <Card />
    </div>
  );
}
function Card() {
  return <div className="size-5 bg-white hover:scale-[300%]">shop</div>;
}
