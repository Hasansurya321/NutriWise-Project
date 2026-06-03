import { LogOut, User } from 'lucide-react';

import { AnimatePresence, motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';

export function UserDropdown({ open }) {
  const { logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/auth');
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.18 }}
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
            bg-sidebar
            p-2
            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            backdrop-blur-2xl
          "
        >
          <div className="flex flex-col gap-1">
            <Button type="button" variant="ghost" onClick={() => navigate('/profile')} size="lg" className="w-full justify-start text-textPrimary">
              <User className="h-4 w-4 mr-2" />
              Edit Profil
            </Button>
            <Button type="button" variant="destructive" onClick={handleLogout} size="lg" className="w-full justify-start">
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
