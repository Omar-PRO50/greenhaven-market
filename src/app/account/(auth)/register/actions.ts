"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  //todo: server-side validation
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("fname") as string;
  const lastName = formData.get("lname") as string;

  console.log("Signup Attempt:", { email, password });

  if (!email || !password) {
    return { message: "Email and password are required." };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({ email, password });

  if (error) {
    //todo redirect
    console.error("Signup Error:", error.message);
    return error;
  }

  console.log("User =>: ", user);
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert([{ id: user!.id, first_name: firstName, last_name: lastName }]);

  if (profileError) {
    console.error("Error inserting data:", profileError);
    //remove the user
    const { error: deleteUserError } = await supabase.auth.admin.deleteUser(
      user!.id,
    );

    if (deleteUserError) {
      console.error("Error deleting user:", deleteUserError);
    }

    return profileError;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
