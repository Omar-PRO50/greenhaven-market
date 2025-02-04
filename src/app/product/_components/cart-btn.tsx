"use client";

import { useState } from "react";
import { PiPlusBold, PiMinusBold } from "react-icons/pi";

export default function CartBtn({
  productQuantity,
}: {
  productQuantity: number;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="space-y-1">
        <p className="text-main-lightT text-sm font-medium">Quantity</p>
        <div className="flex w-max items-center gap-6 rounded-lg border-2 border-main px-3 py-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity === 1}
            className={`disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <PiMinusBold size={10} />
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(productQuantity, q + 1))}
            disabled={quantity === productQuantity}
            className={`disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <PiPlusBold size={10} />
          </button>
        </div>
      </div>
      <button className="w-full max-w-md rounded-3xl bg-main p-2 text-center font-medium text-background transition-transform duration-200 hover:scale-[1.02]">
        Add to Cart
      </button>
    </>
  );
}
