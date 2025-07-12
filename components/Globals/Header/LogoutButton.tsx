"use client";

import { useFormStatus } from "react-dom";

export function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        className={`cursor-pointer py-2 px-4 hover:bg-platinum rounded w-max ${
          pending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={pending}
      >
        Log out
      </button>
    </>
  );
}
