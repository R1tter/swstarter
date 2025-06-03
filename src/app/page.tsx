import PageHeader from "@/components/pageHeader";
import SearchForm from "@/components/searchForm";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f2f2f2] text-black flex flex-col items-center px-4">
      <PageHeader />
      <SearchForm />
    </main>
  );
}
