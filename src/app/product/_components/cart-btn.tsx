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
        <p className="text-sm font-medium text-main-lightT">Quantity</p>
        <div className="flex w-36 justify-around rounded-2xl border-2 border-main py-2">
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
      <button className="btn-primary">Add to Cart</button>
    </>
  );
}
