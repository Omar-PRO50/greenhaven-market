import { products } from "@prisma/client";
import Image from "next/image";
import CartBtn from "./cart-btn";

export default function Product({ product }: { product: products }) {
  return (
    <div className="flex flex-col gap-10 md:flex-row">
      {/* Sticky Image */}
      <div className="relative aspect-square w-full max-w-md self-center overflow-hidden rounded-lg border-2 border-main md:sticky md:top-10 md:self-start">
        <Image src={product.image_url} fill alt={product.title} />
      </div>

      {/* Product Details */}
      <div className="space-y-3">
        <h1 className="text-3xl">{product.title}</h1>
        <p> ${product.price.toFixed(2)} USD</p>
        <CartBtn product={{ ...product, price: product.price.toNumber() }} />
        <div>
          <h6 className="font-medium text-main-lightT underline">OVERVIEW</h6>
          <p className="text-sm text-main-lightT">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
