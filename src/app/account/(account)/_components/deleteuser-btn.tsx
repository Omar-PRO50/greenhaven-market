import React from "react";
import { deleteUser } from "../actions";

export default function DeleteUserBtn() {
  return (
    <div>
      <button
        onClick={deleteUser}
        className="rounded-2xl bg-red-600 p-3 text-white"
      >
        Delete Account
      </button>
    </div>
  );
}
