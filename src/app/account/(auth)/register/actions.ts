"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData): Promise<string> {
  const supabase = await createClient();

  //todo: server-side validation
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("fname") as string;
  const lastName = formData.get("lname") as string;

  if (!email || !password) {
    return "Email and password are required.";
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    //todo redirect
    console.error("Signup Error:", error.message);
    return "Signup Error";
  }

  revalidatePath("/", "layout");
  redirect("/");
}
