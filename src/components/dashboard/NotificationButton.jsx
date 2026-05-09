import { Bell } from 'lucide-react';

import { motion } from 'framer-motion';

import { useDropdown } from '../../hooks/useDropdown';

import { NotificationDropdown } from './NotificationDropdown';

export function NotificationButton() {
  const { open, setOpen, ref } = useDropdown();

  return (
    <div className="relative" ref={ref}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Notifications"
        onClick={() => setOpen(!open)}
        className="
          relative flex h-11 w-11
          items-center justify-center
          rounded-2xl border
          border-white/5 bg-card/80
          backdrop-blur-xl transition-all
          duration-200 hover:border-primary/20
          hover:bg-primary/5
        "
      >
        <Bell className="h-5 w-5 text-textPrimary" />

        <span
          className="
            absolute right-2 top-2
            h-2.5 w-2.5 rounded-full
            bg-primary
          "
        />
      </motion.button>

      <NotificationDropdown open={open} />
    </div>
  );
}
