import { motion, AnimatePresence } from 'framer-motion';

const notifications = [
  {
    title: 'Daily Goal Completed',
    description: 'You reached your calorie intake target for today.',
    time: '5m ago',
  },
  {
    title: 'New Meal Added',
    description: 'Chicken Salad has been added to your recent meals.',
    time: '20m ago',
  },
  {
    title: 'Hydration Reminder',
    description: 'You have not logged your water intake today.',
    time: '1h ago',
  },
];

export function NotificationDropdown({ open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="
            absolute right-0 top-14 z-50
            w-[340px] overflow-hidden
            rounded-3xl border
            border-white/10 bg-card/95
            p-3 shadow-2xl
            backdrop-blur-2xl
          "
        >
          <div className="mb-3 px-2">
            <h3 className="text-sm font-semibold text-textPrimary">Notifications</h3>

            <p className="text-xs text-textMuted">Latest NutriWise activity</p>
          </div>

          <div className="max-h-[320px] overflow-y-auto">
            {notifications.map((item) => (
              <button
                key={item.title}
                className="
                  flex w-full items-start
                  gap-3 rounded-2xl p-3
                  text-left transition-all
                  duration-200 hover:bg-white/[0.03]
                "
              >
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-textPrimary">{item.title}</p>

                    <span className="text-[11px] text-textMuted">{item.time}</span>
                  </div>

                  <p className="mt-1 text-xs leading-relaxed text-textSecondary">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
