import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 10,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: number[] = [];

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center gap-2">

        
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 border rounded-md text-gray-500 disabled:opacity-40"
        >
          ‹
        </button>

        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-md border text-sm
              ${
                currentPage === page
                  ? "border-orange-500 text-orange-500 font-medium"
                  : "text-gray-600 hover:border-orange-400"
              }`}
          >
            {page}
          </button>
        ))}

        {getVisiblePages().slice(-1)[0] < totalPages && (
          <span className="px-2 text-gray-500">...</span>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 border rounded-md text-gray-500 disabled:opacity-40"
        >
          ›
        </button>

      </div>
    </div>
  );
};

export default Pagination;
