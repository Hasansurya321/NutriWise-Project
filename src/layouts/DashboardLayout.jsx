import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import { Navbar } from '../components/navbar/Navbar';
import { Sidebar } from '../components/sidebar/Sidebar';
import { MobileNav } from '../components/navbar/MobileNav';
import { DashboardFooter } from '../components/layout/DashboardFooter';
import { cn } from '../utils/cn';

import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

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
        bg-background
        text-textPrimary
      "
    >
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(!collapsed)}
      />

      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          collapsed ? "lg:pl-[88px]" : "lg:pl-[270px]"
        )}
      >
        <Navbar
          isAuthenticated={isAuthenticated}
          onMenuClick={() => setMobileSidebarOpen(true)}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed(!collapsed)}
        />

        <main
          className="
            flex-1 overflow-x-hidden
            px-4 pb-24 pt-4
            sm:px-6 sm:pb-24 sm:pt-6
            lg:pb-6
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

        <DashboardFooter />
      </div>

      <MobileNav />
    </div>
  );
}
