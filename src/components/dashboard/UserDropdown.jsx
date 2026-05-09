import { LogOut, User } from 'lucide-react';

import { AnimatePresence, motion } from 'framer-motion';

import { NavLink } from 'react-router-dom';

export function UserDropdown({ open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="
            absolute right-0 top-16 z-50
            w-[220px] overflow-hidden
            rounded-3xl border
            border-white/10 bg-card/95
            p-2 shadow-2xl
            backdrop-blur-2xl
          "
        >
          <NavLink
            to="/profile"
            className="
              flex w-full items-center
              gap-3 rounded-2xl px-4 py-3
              text-sm text-textPrimary
              transition-colors duration-200
              hover:bg-white/[0.03]
            "
          >
            <User className="h-4 w-4" />
            Profile
          </NavLink>

          <button
            className="
              flex w-full items-center
              gap-3 rounded-2xl px-4 py-3
              text-sm text-red-400
              transition-colors duration-200
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
