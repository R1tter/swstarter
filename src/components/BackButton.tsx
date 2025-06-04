"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="mt-4 font-bold bg-green-500 text-white px-4 py-2 rounded-full"
    >
      BACK TO SEARCH
    </button>
  );
}
