import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, Blocks, Plus } from 'lucide-react';
import { useRouter } from 'next/router';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter(); 
  const pathName = router.pathname.substring(1); 
  const pageTitle = pathName.charAt(0).toUpperCase() + pathName.slice(1); 

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Link className="lg:hidden" href="#">
        <Blocks className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="flex-1">
        <h1 className="font-semibold text-lg">{pageTitle}</h1>
      </div>
      <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
    </header>
  );
};

export default Header;
