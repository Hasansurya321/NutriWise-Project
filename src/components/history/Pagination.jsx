import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        start = 2;
        end = Math.min(4, totalPages - 1);
      }

      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3);
        end = totalPages - 1;
      }

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2 pt-6" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="
          rounded-full px-4 py-2
          text-sm font-medium
          text-textSecondary
          transition-colors duration-200
          hover:bg-primary/10 hover:text-primary
          disabled:pointer-events-none disabled:opacity-40
        "
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-sm text-textSecondary">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                relative flex h-10 w-10 items-center justify-center
                rounded-full text-sm font-medium
                transition-colors duration-200
                ${currentPage === page ? 'bg-primary/20 text-primary border border-primary/30' : 'text-textSecondary hover:bg-primary/10 hover:text-primary'}
              `}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="
          rounded-full px-4 py-2
          text-sm font-medium
          text-textSecondary
          transition-colors duration-200
          hover:bg-primary/10 hover:text-primary
          disabled:pointer-events-none disabled:opacity-40
        "
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
