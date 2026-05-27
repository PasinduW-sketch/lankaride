import { BusSearch } from "@/components/BusSearch";
import { BusList } from "@/components/BusList";

export default function Home() {
  return (
    <main className="container mx-auto py-20 px-4">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Sri Lankan Bus <span className="text-blue-500">Booking</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Connected with SLTB and private operators for real-time seat availability across the island.
        </p>
      </div>
      
      <BusSearch />
      
      <div className="mt-20">
        <BusList />
      </div>
    </main>
  );
}
