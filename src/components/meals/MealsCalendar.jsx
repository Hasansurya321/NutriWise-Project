import { useRef } from 'react';
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

export default function MealsCalendar({ events, onDateClick, selectedDate }) {
  const calendarRef = useRef(null);

  function renderEventContent(eventInfo) {
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

  return (
    <div className="p-4 sm:p-5">
      {/* Custom nav toolbar */}
      <div className="flex justify-end mb-3 gap-1.5">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-borderPrimary bg-background text-textSecondary hover:bg-primary hover:text-white hover:border-transparent transition-all duration-150"
          onClick={() => calendarRef.current?.getApi().prev()}
          aria-label="Bulan sebelumnya"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          className="px-3 h-8 rounded-lg border border-borderPrimary bg-background text-textSecondary text-xs font-medium hover:bg-primary hover:text-white hover:border-transparent transition-all duration-150"
          onClick={() => calendarRef.current?.getApi().today()}
        >
          Hari ini
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-borderPrimary bg-background text-textSecondary hover:bg-primary hover:text-white hover:border-transparent transition-all duration-150"
          onClick={() => calendarRef.current?.getApi().next()}
          aria-label="Bulan berikutnya"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="id"
        events={events}
        eventContent={renderEventContent}
        dateClick={(info) => onDateClick?.(info.dateStr)}
        eventClick={(info) => onDateClick?.(info.event.startStr.slice(0, 10))}
        headerToolbar={{ left: 'title', center: '', right: '' }}
        dayMaxEvents={1}
        fixedWeekCount={false}
        aspectRatio={1.15}
        dayCellClassNames={(arg) => {
          // Use local date parts to avoid UTC timezone shift
          const d = arg.date;
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          const localDateStr = `${yyyy}-${mm}-${dd}`;
          return localDateStr === selectedDate ? ['fc-day-selected'] : [];
        }}
      />
    </div>
  );
}
