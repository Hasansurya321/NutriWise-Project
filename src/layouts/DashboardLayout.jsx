import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import { Navbar } from '../components/dashboard/Navbar';

import { Sidebar } from '../components/dashboard/Sidebar';

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!mobileSidebarOpen) {
      document.body.style.overflow = '';

      return undefined;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSidebarOpen]);

  return (
    <div
      className="
        relative min-h-screen
        overflow-hidden bg-background
        text-textPrimary
      "
    >
      <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div
        className="
          flex min-h-screen flex-col
          transition-all duration-300
          lg:pl-[270px]
        "
      >
        <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />

        <main
          className="
            flex-1 overflow-x-hidden
            px-4 pb-6 pt-4
            sm:px-6 sm:pb-8 sm:pt-6
            xl:px-8
          "
        >
          <div
            className="
              mx-auto w-full
              max-w-[1600px]
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
