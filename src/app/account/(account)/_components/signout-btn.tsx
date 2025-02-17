import { signOut } from "../actions";

export default function SignOutBtn() {
  return (
    <div>
      <button onClick={signOut} className="text-main underline">
        Log out
      </button>
    </div>
  );
}
