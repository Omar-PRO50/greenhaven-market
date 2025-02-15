import { createClient } from "@/utils/supabase/server";
import { signOut } from "./actions";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main className="px-cont-sm md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <div className="mx-auto w-full max-w-max-screen-width">
        <div>account : {data.user!.email}</div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </main>
  );
}
