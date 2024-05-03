import Sidebar from '@/components/Sidebar';
import BusTimetable from '@/components/DataTable/SchedulesDataTable';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <BusTimetable></BusTimetable>
        </main>
      </div>
    </div>
  );
}
