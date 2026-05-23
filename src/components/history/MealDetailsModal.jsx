import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import { getIconByName } from '../../utils/iconRegistry';

export function MealDetailsModal({ meal, open, onClose }) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!open) return undefined;

    const { body } = document;
    const previousStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      left: body.style.left,
      right: body.style.right,
      paddingRight: body.style.paddingRight,
    };

    scrollYRef.current = window.scrollY;

    const scrollbarCompensation = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    if (scrollbarCompensation > 0) {
      body.style.paddingRight = `${scrollbarCompensation}px`;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);

      body.style.overflow = previousStyle.overflow;
      body.style.position = previousStyle.position;
      body.style.top = previousStyle.top;
      body.style.width = previousStyle.width;
      body.style.left = previousStyle.left;
      body.style.right = previousStyle.right;
      body.style.paddingRight = previousStyle.paddingRight;

      window.scrollTo(0, scrollYRef.current);
    };
  }, [open, onClose]);

  if (!meal) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, ease: 'easeOut' }} className="fixed inset-0 z-[120]">
          {/* Fullscreen viewport backdrop */}
          <div className="absolute inset-0 bg-modalOverlay backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          {/* Dialog layer */}
          <div className="relative z-[1] flex min-h-full items-center justify-center overflow-y-auto p-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Meal details"
              className="
                relative
                w-[92%] max-w-2xl
                rounded-3xl
                border border-modalPanelBorder
                bg-modalPanel
                p-6
                shadow-xl
                max-h-[90vh]
                overflow-y-auto
              "
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-textSecondary">
                    {meal.type} • {meal.time}
                  </p>

                  <h2 className="mt-1 text-2xl font-semibold text-textPrimary">{meal.totalCalories} Calories</h2>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close meal details"
                  className="
                  rounded-xl
                  border border-borderPrimary
                  p-2
                  text-textSecondary
                  transition-colors duration-200
                  hover:bg-background/60
                "
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="mt-8 space-y-6">
                {/* AI Insight */}
                <div>
                  <h3
                    className="
                    text-sm font-medium
                    text-textSecondary
                  "
                  >
                    AI Nutrition Insight
                  </h3>

                  <div
                    className="
                    mt-3
                    rounded-2xl
                    border border-borderPrimary
                    bg-background/40
                    p-4
                    text-sm leading-relaxed
                    text-textPrimary
                  "
                  >
                    {meal.aiInsight}
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h3
                    className="
                    text-sm font-medium
                    text-textSecondary
                  "
                  >
                    Ingredients
                  </h3>

                  <div
                    className="
                    mt-3
                    flex flex-wrap gap-2
                  "
                  >
                    {meal.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="
                        rounded-full
                        border border-borderPrimary
                        bg-background/40
                        px-4 py-2
                        text-sm text-textPrimary
                      "
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nutrition Macros */}
                <div>
                  <h3
                    className="
                    text-sm font-medium
                    text-textSecondary
                  "
                  >
                    Nutrition Macros
                  </h3>

                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div
                      className="
                      rounded-2xl
                      border border-borderPrimary
                      bg-background/40
                      p-4
                    "
                    >
                      <p className="text-xs text-textSecondary">Protein</p>

                      <p className="mt-2 text-lg font-semibold text-textPrimary">{meal.macros.protein}g</p>
                    </div>

                    <div
                      className="
                      rounded-2xl
                      border border-borderPrimary
                      bg-background/40
                      p-4
                    "
                    >
                      <p className="text-xs text-textSecondary">Carbs</p>

                      <p className="mt-2 text-lg font-semibold text-textPrimary">{meal.macros.carbs}g</p>
                    </div>

                    <div
                      className="
                      rounded-2xl
                      border border-borderPrimary
                      bg-background/40
                      p-4
                    "
                    >
                      <p className="text-xs text-textSecondary">Fats</p>

                      <p className="mt-2 text-lg font-semibold text-textPrimary">{meal.macros.fats}g</p>
                    </div>
                  </div>
                </div>

                {/* Food Items */}
                <div>
                  <h3
                    className="
                    text-sm font-medium
                    text-textSecondary
                  "
                  >
                    Meal Items
                  </h3>

                  <div className="mt-3 space-y-3">
                    {meal.items.map((item) => {
                      const Icon = getIconByName(item.iconName, 'Apple');

                      return (
                        <div
                          key={item.id}
                          className="
                        flex items-center justify-between
                        rounded-2xl
                        border border-borderPrimary
                        bg-background/40
                        p-4
                      "
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-card text-primary">{Icon ? <Icon className="h-5 w-5" /> : null}</div>

                            <div>
                              <p className="font-medium text-textPrimary">{item.name}</p>

                              <p className="text-sm text-textSecondary">{item.calories} kcal</p>
                            </div>
                          </div>

                          <div className="text-right text-sm text-textSecondary">
                            <p>P {item.protein}g</p>
                            <p>C {item.carbs}g</p>
                            <p>F {item.fats}g</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
