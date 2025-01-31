"use client";
import { useFormStatus } from "react-dom";
import { subscribeNewsletter } from "@/app/actions";
import { useActionState, useState } from "react";
import Form from "next/form";

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeNewsletter, {
    message: "",
    success: false,
  });
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  return state.success ? (
    <div className="rounded-md border-2 border-background p-3 text-2xl font-bold">
      Thanks for subscribing to our Newsletter!
    </div>
  ) : (
    <Form action={formAction} className="max-w-md">
      <h5 className="text-xl font-medium">Subscribe to Our Newsletter</h5>
      <p className="mb-3 text-sm">
        Stay informed about our latest sustainable products and offers.
      </p>

      {/* Email Input */}
      <div className="mb-3 flex flex-col gap-4 xsm:flex-row">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Enter your email"
          className="flex-1 rounded border p-2 text-black focus:outline-background-dark"
          required
          aria-required
        />
        <SubmitButton />
      </div>

      {/* Terms and Conditions */}
      <div className="flex space-x-1">
        {/* Checkmark */}
        <div className="relative size-4 self-center">
          <input
            required
            aria-required
            type="checkbox"
            value=""
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="peer absolute inset-0 z-10 size-full self-center opacity-0"
          />

          <div className="relative size-full rounded-md border-2 border-gray-300 transition-all duration-200 peer-checked:border-background peer-checked:bg-background">
            <svg
              className={`absolute inset-0 h-full w-full text-main transition-opacity duration-200 ${isChecked ? "opacity-100" : "opacity-0"} `}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <label htmlFor="terms" className="text-sm font-light">
          I agree to GreenHaven Market{"'"}s{" "}
          <a href="/terms-of-service" className="underline" target="_blank">
            terms and conditions
          </a>
        </label>
      </div>

      {/* Message */}
      <p
        className={`mt-2 text-sm ${state.success ? "text-green-600" : "text-red-600"}`}
      >
        {state.message}
      </p>
    </Form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      name="submit"
      type="submit"
      disabled={pending}
      className="rounded bg-background px-4 py-2 text-main transition-colors hover:bg-background-dark disabled:bg-disabled"
    >
      {pending ? "Submitting..." : "Subscribe"}
    </button>
  );
}
