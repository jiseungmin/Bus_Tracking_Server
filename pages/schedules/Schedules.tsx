import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Blocks } from "lucide-react";
import Sidebar from "@/components/Sidebar";
// import BusTimetable from "@/components/SchedulesDataTable2";
import BusTimetable from "@/components/SchedulesDataTable1";
import { DataTableDemo } from "./DemoTable";
// shadcn/ui/ Combobox

export function Schedules() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        {/*TODO header 자동으로 Schedules로 바꾸기 */}
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Blocks className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Schedules</h1>
          </div>
          <Button
            className="rounded-full border-gray-200 w-8 h-8 dark:border-gray-800"
            size="icon"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Add route</span>
          </Button>
        </header>
        {/* main */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {/* <EnhancedTable></EnhancedTable> */}
          <BusTimetable></BusTimetable>

          <DataTableDemo />
        </main>
      </div>
    </div>
  );
}
