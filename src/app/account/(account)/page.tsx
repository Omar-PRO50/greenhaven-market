import { createClient } from "@/utils/supabase/server";
import SignOutBtn from "./_components/signout-btn";
import DeleteUserBtn from "./_components/deleteuser-btn";
import { Tables } from "@/types/database.types";

async function getUser() {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching User:", userError);
    return null;
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user?.id)
    .maybeSingle();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return null;
  }
  if (!profileData) {
    console.error("Error profile doesn't exist");
    return null;
  }

  return { userData, profileData };
}

export default async function Page() {
  const user = await getUser();
  console.log("fetched user", user);
  if (!user) return;

  return (
    <main className="px-cont-sm md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <div className="mx-auto w-full max-w-max-screen-width">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span>Account : {user.userData.user.email}</span>
            <span>First name: {user.profileData.first_name}</span>
            <span>Last name: {user.profileData.last_name}</span>
            <span></span>
          </div>
          <SignOutBtn />
          <DeleteUserBtn />
        </div>
      </div>
    </main>
  );
}
