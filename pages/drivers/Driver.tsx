import { Button } from '@/components/ui/button';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';

import { FilePen } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Driver() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        {/* Header */}
        <Header />
        {/* mainContent */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Driver ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">DR1234</TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell className="hidden md:table-cell">john@example.com</TableCell>
                  <TableCell className="hidden md:table-cell">+1 (123) 456-7890</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost">
                      <FilePen className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">DR1235</TableCell>
                  <TableCell className="font-medium">Alice Johnson</TableCell>
                  <TableCell className="hidden md:table-cell">alice@example.com</TableCell>
                  <TableCell className="hidden md:table-cell">+1 (987) 654-3210</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost">
                      <FilePen className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">DR1236</TableCell>
                  <TableCell className="font-medium">Emma Wilson</TableCell>
                  <TableCell className="hidden md:table-cell">emma@example.com</TableCell>
                  <TableCell className="hidden md:table-cell">+1 (111) 222-3333</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost">
                      <FilePen className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">DR1237</TableCell>
                  <TableCell className="font-medium">Mark Lee</TableCell>
                  <TableCell className="hidden md:table-cell">mark@example.com</TableCell>
                  <TableCell className="hidden md:table-cell">+1 (999) 888-7777</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost">
                      <FilePen className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">DR1238</TableCell>
                  <TableCell className="font-medium">Sophia Clark</TableCell>
                  <TableCell className="hidden md:table-cell">sophia@example.com</TableCell>
                  <TableCell className="hidden md:table-cell">+1 (444) 555-6666</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost">
                      <FilePen className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
