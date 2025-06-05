"use client";
import { useStats } from "@/hooks/useStats";
import PageHeader from "@/components/PageHeader";
import PieChart from "@/components/PieChart";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default function StatsPage() {
  const { data, loading, refreshing, refreshStats } = useStats();

  if (loading || !data) return <div className="p-8">Loading...</div>;

  const topQueries = data.topQueries || [];

  return (
    <main className="bg-[#ededed] min-h-screen flex flex-col items-center">
      <PageHeader />
      <div className="max-w-xl w-full p-8 bg-white rounded shadow mt-8 relative">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Search statistics</h1>
        <button
          onClick={refreshStats}
          disabled={refreshing}
          className="mb-6 font-bold bg-green-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition text-lg"
        >
          {refreshing ? "Updating..." : "Update"}
        </button>
        {topQueries.length === 0 ? (
          <div>No searches registered.</div>
        ) : (
          <PieChart data={topQueries} />
        )}
        <ul className="mt-8">
          {topQueries.map((q) => (
            <li key={q.query} className="mb-2 flex justify-between font-bold text-gray-800">
              <span>{q.query}</span>
              <span>{q.count} ({q.percentage}%)</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-sm text-gray-500">
          Updated: {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : "-"}
        </div>
        <div className="flex justify-end mt-6">
          <BackButton />
        </div>
      </div>
    </main>
  );
}
