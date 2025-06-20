import Link from "next/link";

export default function FabStatsButton() {
  return (
    <Link href="/stats">
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="flex items-center justify-end w-12 h-12 bg-blue-600 rounded-full shadow-lg cursor-pointer overflow-hidden transition-all duration-300 group-hover:w-40">
          <span className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-semibold mr-2 whitespace-nowrap pl-4">
            Stats
          </span>
          <div className="flex items-center justify-center w-12 h-12">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
