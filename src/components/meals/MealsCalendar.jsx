import { useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MEAL_TYPE_COLORS = {
  BREAKFAST: '#f59e0b',
  LUNCH: '#10b981',
  DINNER: '#6366f1',
  SNACK: '#f43f5e',
};

// --- Helper Functions ---

/** Formats a Date object into YYYY-MM-DD */
function formatDateKey(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// --- Sub Components ---

function EventContent({ eventInfo }) {
  const { meals, totalCalorie } = eventInfo.event.extendedProps;
  const types = [...new Set(meals.map((m) => m.mealType))];

  return (
    <div className="flex flex-col items-start gap-[3px] px-1 pb-1 pt-0.5 cursor-pointer w-full">
      <span className="text-[0.6rem] font-bold leading-none text-primary whitespace-nowrap">
        {Math.round(totalCalorie || 0)} kcal
      </span>
      <div className="flex gap-[3px] flex-wrap">
        {types.slice(0, 4).map((type) => (
          <span
            key={type}
            className="inline-block w-[6px] h-[6px] rounded-full shrink-0"
            style={{ background: MEAL_TYPE_COLORS[type] || '#94a3b8' }}
          />
        ))}
      </div>
    </div>
  );
}

function CalendarNavButton({ onClick, icon: Icon, label, className = '' }) {
  const baseClasses = "flex items-center justify-center rounded-lg border border-borderPrimary bg-background text-textSecondary hover:bg-primary hover:text-white hover:border-transparent transition-all duration-150";
  return (
    <button
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      {Icon ? <Icon size={16} /> : label}
    </button>
  );
}

function CalendarToolbar({ calendarRef }) {
  const handlePrev = useCallback(() => calendarRef.current?.getApi().prev(), [calendarRef]);
  const handleToday = useCallback(() => calendarRef.current?.getApi().today(), [calendarRef]);
  const handleNext = useCallback(() => calendarRef.current?.getApi().next(), [calendarRef]);

  return (
    <div className="flex justify-end mb-3 gap-1.5">
      <CalendarNavButton onClick={handlePrev} icon={ChevronLeft} label="Bulan sebelumnya" className="w-8 h-8" />
      <CalendarNavButton onClick={handleToday} label="Hari ini" className="px-3 h-8 text-xs font-medium" />
      <CalendarNavButton onClick={handleNext} icon={ChevronRight} label="Bulan berikutnya" className="w-8 h-8" />
    </div>
  );
}

// --- Main Component ---

export default function MealsCalendar({ events, onDateClick, selectedDate }) {
  const calendarRef = useRef(null);

  const handleDayCellClassNames = useCallback((arg) => {
    return formatDateKey(arg.date) === selectedDate ? ['fc-day-selected'] : [];
  }, [selectedDate]);

  const handleDateClick = useCallback((info) => {
    onDateClick?.(info.dateStr);
  }, [onDateClick]);

  const handleEventClick = useCallback((info) => {
    onDateClick?.(info.event.startStr.slice(0, 10));
  }, [onDateClick]);

  return (
    <div className="p-4 sm:p-5 flex flex-col flex-1">
      <CalendarToolbar calendarRef={calendarRef} />

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="id"
        events={events}
        eventContent={(info) => <EventContent eventInfo={info} />}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        headerToolbar={{ left: 'title', center: '', right: '' }}
        dayMaxEvents={1}
        fixedWeekCount={false}
        height={"auto"}
        dayCellClassNames={handleDayCellClassNames}
      />
    </div>
  );
}
