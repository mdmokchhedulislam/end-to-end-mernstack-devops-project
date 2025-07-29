

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  maxVisiblePages?: number
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
}: Props) => {
  // Always show pagination even if there's only one page
  // Remove the early return: if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const pages: (number | string)[] = []

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      return Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1)
    }

    const halfVisible = Math.floor(maxVisiblePages / 2)
    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, currentPage + halfVisible)

    // Adjust if we're near the beginning
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages)
    }

    // Adjust if we're near the end
    if (currentPage > totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1)
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push("...")
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...")
      }
      pages.push(totalPages)
    }

    return pages
  }

  const visiblePages = getVisiblePages()
  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 mt-8 mb-4 mr-0 lg:mr-6">
      {/* First Page Button */}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`min-w-[40px] h-[40px] flex items-center justify-center rounded-xl border transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-1 focus:ring-offset-transparent ${
            currentPage !== 1
              ? "border-gray-600/30 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/60 hover:border-gray-500/50 hover:text-white hover:scale-105"
              : "border-gray-700/20 bg-gray-900/30 text-gray-600 cursor-not-allowed"
          }`}
          aria-label="Go to first page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className={`min-w-[40px] h-[40px] flex items-center justify-center rounded-xl border transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-1 focus:ring-offset-transparent ${
          canGoPrevious
            ? "border-gray-600/30 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/60 hover:border-gray-500/50 hover:text-white hover:scale-105"
            : "border-gray-700/20 bg-gray-900/30 text-gray-600 cursor-not-allowed"
        }`}
        aria-label="Go to previous page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="min-w-[40px] h-[40px] flex items-center justify-center text-gray-500 font-medium"
            >
              ...
            </span>
          )
        }

        const pageNumber = page as number
        const isActive = pageNumber === currentPage

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`min-w-[40px] h-[40px] flex items-center justify-center rounded-xl border font-medium transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-500/50 shadow-lg shadow-purple-500/25 scale-105 focus:ring-purple-400/50"
                : "border-gray-600/30 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-purple-800/30 hover:border-purple-500/40 hover:text-purple-200 hover:scale-105 focus:ring-purple-400/50"
            }`}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
          </button>
        )
      })}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`min-w-[40px] h-[40px] flex items-center justify-center rounded-xl border transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-1 focus:ring-offset-transparent ${
          canGoNext
            ? "border-gray-600/30 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/60 hover:border-gray-500/50 hover:text-white hover:scale-105"
            : "border-gray-700/20 bg-gray-900/30 text-gray-600 cursor-not-allowed"
        }`}
        aria-label="Go to next page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Last Page Button */}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`min-w-[40px] h-[40px] flex items-center justify-center rounded-xl border transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-1 focus:ring-offset-transparent ${
            currentPage !== totalPages
              ? "border-gray-600/30 bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/60 hover:border-gray-500/50 hover:text-white hover:scale-105"
              : "border-gray-700/20 bg-gray-900/30 text-gray-600 cursor-not-allowed"
          }`}
          aria-label="Go to last page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Page Info */}
      <div className="hidden sm:flex items-center ml-4 text-sm text-gray-400">
        <span>
          Page {currentPage} of {Math.max(1, totalPages)}
        </span>
      </div>
    </div>
  )
}
