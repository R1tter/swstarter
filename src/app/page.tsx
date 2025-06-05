import PageHeader from "@/components/PageHeader";
import SearchForm from "@/components/SearchForm";
import FabStatsButton from "@/components/FabStatsButton";


export default function HomePage() {
  return (
    <>
      <main className="bg-[#ededed] min-h-screen flex flex-col items-center">
        <PageHeader />
        <div className="flex justify-center items-center w-full max-w-3xl">
          <SearchForm />
        </div>
      </main>
      <FabStatsButton />
    </>
  );
}
