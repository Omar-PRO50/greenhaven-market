"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { IconContext } from "react-icons";
import { RiCloseLargeFill } from "react-icons/ri";

export default function CancelFiltersandSort({
  highestPrice,
}: {
  highestPrice: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const maxPrice = searchParams.get("maximumPrice");
  const minPrice = searchParams.get("minimumPrice");
  const category = searchParams.get("category");
  const sortby = searchParams.get("sort_by");

  function handleCancel(paramsToDelete: string[]) {
    const params = new URLSearchParams(searchParams);
    paramsToDelete.forEach((param) => params.delete(param));
    replace(`${pathname}?${params.toString()}`);
  }

  const buttonStyles =
    "rounded-2xl px-2  items-center gap-2 h-8 shadow-[0_0_0_1px] shadow-main hover:shadow-[0_0_0_2px] transition-shadow ";
  return (
    <IconContext.Provider
      value={{ size: "10", style: { transform: "translateY(1px)" } }}
    >
      <div className="flex flex-wrap gap-3">
        <button
          className={
            buttonStyles + `${maxPrice || minPrice ? "flex" : "hidden"}`
          }
          onClick={() => {
            handleCancel(["maximumPrice", "minimumPrice"]);
          }}
        >
          <span>
            ${minPrice ?? 0} - ${maxPrice ?? highestPrice}
          </span>
          <RiCloseLargeFill />
        </button>
        <button
          className={buttonStyles + `${category ? "flex" : "hidden"}`}
          onClick={() => {
            handleCancel(["category"]);
          }}
        >
          <span>Category: {category}</span>
          <RiCloseLargeFill />
        </button>
        <button
          className={buttonStyles + `${sortby ? "flex" : "hidden"}`}
          onClick={() => {
            handleCancel(["sort_by"]);
          }}
        >
          <span>Sort by: {sortby}</span>
          <RiCloseLargeFill />
        </button>
      </div>
    </IconContext.Provider>
  );
}
