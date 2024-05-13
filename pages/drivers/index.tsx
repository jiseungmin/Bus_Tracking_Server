import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import DriverDataTable from '@/components/DataTable/DriverDataTable';
export default function home() {
  return (
    <div>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          {/* Header */}
          <Header />
          {/* mainContent */}
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <DriverDataTable />
          </main>
        </div>
      </div>
    </div>
  );
}
