"use client";

import { useCart } from "@/context/cart-context";
import { SerializedProductType } from "@/types/prism-product";

export default function CartBtn({
  product,
}: {
  product: SerializedProductType;
}) {
  const { updateQuantity, cart } = useCart();

  return (
    <button
      onClick={() => {
        updateQuantity(product, "inc", 1);
      }}
      disabled={
        product.quantity === 0 ||
        (cart.find((c) => c.id === product.id)?.orderQuantity || 0) >=
          product.quantity
      }
      className={`mt-auto rounded-3xl border-2 border-main py-2 transition-colors duration-200 hover:bg-main hover:text-background disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-white disabled:hover:text-white`}
    >
      Add to Cart
    </button>
  );
}
