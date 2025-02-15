"use client";

import { useActionState } from "react";
import { login } from "./actions";
import InputFloatingLabel from "@/components/input-floating-label";
import Link from "next/link";

type State = {
  message: string;
  success: boolean;
};

async function signUpAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  console.log("loging in");
  //todo: client side validation
  const error = await login(formData);
  return { success: false, message: error.message };
}

export default function Page() {
  const [state, formAction, isPending] = useActionState(signUpAction, {
    success: false,
    message: "",
  });
  return (
    <main className="px-cont-sm py-10 text-main md:flex-row md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <div className="mx-auto flex max-w-max-screen-width flex-col items-center gap-10">
        <h2 className="text-3xl md:text-5xl">Login</h2>
        <form
          action={formAction}
          className="flex w-full max-w-96 flex-col items-center gap-8 text-main"
        >
          <InputFloatingLabel type="email" id="email" label="Email" />
          <InputFloatingLabel type="password" id="password" label="Password" />

          <div className="text-red-600">{state.message}</div>
          <div>
            <button
              disabled={isPending}
              type="submit"
              className="w-max rounded-3xl bg-main px-10 py-3 text-white hover:scale-[1.01] focus:scale-[1.01] disabled:bg-disabled"
            >
              Sign In
            </button>
            <Link
              href="/account/register"
              className="mt-1 block text-center text-main-lightT underline"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
