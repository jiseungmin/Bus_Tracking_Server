import React from 'react';
import { useRouter } from 'next/router';
import { Home, User, Clock, Blocks, BookUser } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  {
    href: '/home',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/drivers',
    label: 'Drivers',
    icon: User,
  },
  {
    href: '/Review',
    label: 'Review',
    icon: BookUser,
  },
  {
    href: '/schedules',
    label: 'Schedules',
    icon: Clock,
  },
];

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link href="/home" passHref>
            <div className="flex items-center gap-2 font-semibold cursor-pointer">
              <Blocks className="h-6 w-6" />
              SunMoon Shuttle Bus
            </div>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} passHref>
                <div
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${
                    router.pathname === href
                      ? 'bg-gray-100 text-gray-900 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
