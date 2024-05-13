import React from 'react';
import SendMessage from '../../components/SendMessage';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
export default function Home() {
  return (
    <div>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <SendMessage />
          </main>
        </div>
      </div>
    </div>
  );
}
