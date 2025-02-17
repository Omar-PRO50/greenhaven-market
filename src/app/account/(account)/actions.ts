"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";

export async function signOut() {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    //todo redirect
    console.error("sign out Error:", error.message);
    return error;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function deleteUser() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use the service role key
  );

  const { data: userData, error: userError } = await (
    await createServerClient()
  ).auth.getUser();
  if (userError) {
    console.log("delete get user error", userError);
    return "Error";
  }

  const { error: deleteError } = await supabase.auth.admin.deleteUser(
    userData.user.id,
  );
  if (deleteError) {
    console.log("delete delete user error", deleteError);
    return deleteError;
  }
  revalidatePath("/", "layout");
  redirect("/");
}
