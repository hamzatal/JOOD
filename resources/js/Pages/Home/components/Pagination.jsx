import { ArrowLeft, ChevronRight } from "lucide-react";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    isDarkMode,
}) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const pageRange = 2;
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                    isDarkMode
                        ? "bg-gray-700 text-white hover:bg-primary"
                        : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                } disabled:opacity-50 transition-all shadow-md`}
            >
                <ArrowLeft size={20} />
            </button>

            {pages
                .filter((page) => page >= startPage && page <= endPage)
                .map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md ${
                            currentPage === page
                                ? "bg-gradient-to-r from-primary to-secondary text-white"
                                : isDarkMode
                                ? "bg-gray-700 text-white hover:bg-primary"
                                : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                        }`}
                    >
                        {page}
                    </button>
                ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${
                    isDarkMode
                        ? "bg-gray-700 text-white hover:bg-primary"
                        : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                } disabled:opacity-50 transition-all shadow-md`}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
