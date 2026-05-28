import { Search } from 'lucide-react';

export default function HistorySearch({ value, onChange }) {
  return (
    <div
      className="
        relative
        w-full
      "
    >
      <Search
        size={18}
        className="
          absolute left-4 top-1/2
          -translate-y-1/2
          text-searchIcon
        "
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search food history..."
        aria-label="Search food history"
        className="
          h-14 w-full
          rounded-3xl
          border border-borderPrimary
          bg-searchSurface
          pl-12 pr-4
          text-sm text-searchText
          outline-none
          transition-[background-color,border-color,color,box-shadow] duration-200
          placeholder:text-searchPlaceholder
          hover:border-searchBorderHover
          hover:bg-searchSurfaceHover
          focus:border-searchBorderFocus
          focus:bg-searchSurfaceFocus
          focus:ring-1 focus:ring-primary/15
        "
      />
    </div>
  );
}
