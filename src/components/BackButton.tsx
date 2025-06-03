"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="mt-4 font-bold bg-green-500 text-white px-4 py-2 rounded-full"
    >
      BACK TO SEARCH
    </button>
  );
}
