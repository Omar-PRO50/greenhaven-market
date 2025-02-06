"use client";
import {
  PiMinusBold,
  PiPlusBold,
  PiShoppingCartSimple,
  PiTrash,
  PiX,
} from "react-icons/pi";
import { useState, useEffect, SetStateAction, useRef, Dispatch } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Disable scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      window.document.body.classList.add("overflow-hidden");
    } else {
      window.document.body.classList.remove("overflow-hidden");
    }

    return () => window.document.body.classList.remove("overflow-hidden"); // Cleanup
  }, [isOpen]);

  return (
    <>
      <button
        name="shoppingCart"
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <PiShoppingCartSimple />
      </button>
      {createPortal(
        <Cart isOpen={isOpen} setIsOpen={setIsOpen} />,
        window.document.body,
      )}
    </>
  );
}

function Cart({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const sideBarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#263e1d80] transition-[visibility] ${isOpen ? "visible" : "invisible delay-300"}`}
    >
      <div
        ref={sideBarRef}
        className={`relative ml-auto h-full w-[calc(100%-40px)] max-w-[400px] space-y-3 overflow-y-auto bg-background text-main shadow-xl transition-transform duration-200 scrollbar-hide ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/*header */}
        <div className="sticky top-0 z-20 w-full space-y-3 bg-background px-3 pt-3">
          <div className="flex justify-between">
            <h3 className="text-lg">Your Cart</h3>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <PiX className="" size={30} />
            </button>
          </div>
          <div className="flex justify-between text-sm opacity-50">
            <p>PRODUCT</p>
            <p>TOTAL</p>
          </div>
          <hr className="border-t-1 border-main/50" />
        </div>
        <div className="space-y-5 px-3">
          <Product />
        </div>
        {/*Total */}
        <div className="sticky top-full z-20 w-full space-y-3 bg-background px-3 pb-3">
          <hr className="border-t-1 border-main/50" />
          <div className="flex justify-between">
            <h2>Estimated Total</h2>
            <p className="text-lg text-main-lightT">${"94.00"} USD</p>
          </div>
          <div>
            <button className="btn-primary">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Product() {
  const productQuantity = 10;
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="grid grid-cols-[25%_auto_auto_auto] gap-4">
      <div className="row-span-2">
        <Image
          src="/placeholder.png"
          alt=""
          width={100}
          height={100}
          className="w-full object-cover"
        />
      </div>
      <div className="col-span-2">
        <Link href={""}>Multi Purpose cleaning spray</Link>
        <div>$11.00</div>
      </div>
      <div className="text-end">$11.00</div>

      <div className="col-span-2">
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
      <div className="flex items-center">
        <PiTrash className="" size={15} />
      </div>
    </div>
  );
}
