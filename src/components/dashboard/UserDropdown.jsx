import { LogOut, User } from 'lucide-react';

import { AnimatePresence, motion } from 'framer-motion';

import { NavLink, useNavigate } from 'react-router-dom';

import { logoutDummy } from '../../services/auth';

export function UserDropdown({ open }) {
  const navigate = useNavigate();

  function handleLogout() {
    logoutDummy();
    navigate('/auth', { replace: true });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute right-0 top-[72px]
            z-[100]
            w-[220px]
            overflow-hidden
            rounded-3xl
            border border-white/10
            bg-[#081225]/95
            p-2
            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            backdrop-blur-2xl
          "
        >
          {/* PROFILE */}
          <NavLink
            to="/profile"
            className="
              flex items-center
              gap-3
              rounded-2xl
              px-4 py-3
              text-sm font-medium
              text-white
              transition-all duration-200
              hover:bg-white/5
            "
          >
            <User className="h-4 w-4" />
            Profile
          </NavLink>

          {/* LOGOUT */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full items-center
              gap-3
              rounded-2xl
              px-4 py-3
              text-sm font-medium
              text-red-400
              transition-all duration-200
              hover:bg-red-500/10
            "
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
