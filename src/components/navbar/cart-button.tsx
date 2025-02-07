"use client";
import {
  PiMinusBold,
  PiPlusBold,
  PiShoppingCartSimple,
  PiTrash,
  PiX,
} from "react-icons/pi";
import { useState, useEffect, SetStateAction, useRef, Dispatch } from "react";
import { usePortal } from "@/hooks/usePortal";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { SerializedProductType } from "@/types/prism-product";

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const portal = usePortal("body");
  const { cart } = useCart();

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
        className="relative"
        name="shoppingCart"
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {cart.length > 0 && (
          <span className="absolute -right-[5px] top-[13px] z-30 size-4 rounded-full bg-main text-center text-xs text-background">
            {cart.length}
          </span>
        )}
        <PiShoppingCartSimple />
      </button>
      {portal(<Cart isOpen={isOpen} setIsOpen={setIsOpen} />)}
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
  const { cart } = useCart();
  const total = cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.orderQuantity;
  }, 0);

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
          {cart.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        {/*Total */}
        <div className="sticky top-full z-20 w-full space-y-3 bg-background px-3 pb-3">
          <hr className="border-t-1 border-main/50" />
          <div className="flex justify-between">
            <h2>Estimated Total</h2>
            <p className="text-lg text-main-lightT">${total.toFixed(2)} USD</p>
          </div>
          <div>
            <button className="btn-primary">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
interface CartItem extends SerializedProductType {
  orderQuantity: number;
}

function Product({ product }: { product: CartItem }) {
  const { image_url, name, title, price, orderQuantity, quantity } = product;
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="grid grid-cols-[25%_1fr_1fr_minmax(min-content,auto)] gap-4">
      <div className="row-span-2">
        <Image
          src={image_url}
          alt={title}
          width={100}
          height={100}
          className="w-full object-cover"
        />
      </div>
      <div className="col-span-2">
        <Link href={"/product/" + name}>{title}</Link>
        <div>${price.toFixed(2)}</div>
      </div>
      <div className="text-end">${(price * orderQuantity).toFixed(2)}</div>

      <div className="col-span-3 flex items-center gap-4">
        <div className="flex w-36 justify-around rounded-2xl border-2 border-main py-2">
          <button
            onClick={() => {
              updateQuantity(product, "dec", 1);
            }}
            className={`group disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <PiMinusBold
              size={10}
              className="group-disabled:hover:cursor-not-allowed"
            />
          </button>
          <span className="font-medium">{orderQuantity}</span>
          <button
            onClick={() => {
              updateQuantity(product, "inc", 1);
            }}
            disabled={orderQuantity >= quantity}
            className={`group disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <PiPlusBold
              size={10}
              className="group-disabled:hover:cursor-not-allowed"
            />
          </button>
        </div>
        <button
          onClick={() => {
            removeItem(product);
          }}
        >
          <PiTrash className="hover:cursor-pointer" size={15} />
        </button>
      </div>
    </div>
  );
}
