import { HTMLInputTypeAttribute } from "react";

export default function InputFloatingLabel({
  type,
  id,
  label,
}: {
  type: HTMLInputTypeAttribute;
  id: string;
  label: string;
}) {
  return (
    <div className="relative w-full">
      <input
        name={id}
        required
        type={type}
        id={id}
        className="peer block w-full appearance-none rounded-lg border border-main bg-background px-3 py-2.5 text-sm text-main focus:outline-none focus:ring-0"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-main-lightT duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2"
      >
        {label}
      </label>
    </div>
  );
}
