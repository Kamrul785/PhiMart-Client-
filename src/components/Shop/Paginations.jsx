import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Paginations = ({ totalPages, currentPage, handleCurrentPage }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      handleCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handleCurrentPage(currentPage + 1);
    }
  };

  // Show page numbers around current page
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        endPage = maxPagesToShow;
      } else if (currentPage > totalPages - 3) {
        startPage = totalPages - maxPagesToShow + 1;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 my-8 animate-fade-in-up">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-teal-600 hover:text-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          const isPrev = pageNumbers[index - 1] && page - pageNumbers[index - 1] > 1;

          return (
            <div key={page}>
              {isPrev && <span className="px-2 text-gray-400">...</span>}
              <button
                onClick={() => handleCurrentPage(page)}
                className={`px-4 py-2 rounded-lg font-semibold transition transform ${
                  currentPage === page
                    ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg scale-105"
                    : "border-2 border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600"
                }`}
              >
                {page}
              </button>
            </div>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-teal-600 hover:text-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>

      {/* Info Text */}
      <div className="ml-4 text-sm text-gray-600 hidden sm:block">
        Page <span className="font-semibold text-gray-900">{currentPage}</span> of <span className="font-semibold text-gray-900">{totalPages}</span>
      </div>
    </div>
  );
};

export default Paginations;
