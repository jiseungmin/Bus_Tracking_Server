import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Blocks, Plus } from "lucide-react";

interface HeaderProps {
  // 必要に応じてpropsを定義
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Link className="lg:hidden" href="#">
        <Blocks className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="flex-1">
        <h1 className="font-semibold text-lg">Home</h1>
      </div>
      <Button
        className="rounded-full border-gray-200 w-8 h-8 dark:border-gray-800"
        size="icon"
      >
        <Plus className="w-4 h-4" />
        <span className="sr-only">Add route</span>
      </Button>
    </header>
  );
};

export default Header;
