import React from 'react';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    totalItems,
}) => {
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages === 0) {
            return [1];
        }

        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        pages.push(1);

        if (currentPage <= 3) {
            pages.push(2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }

        return pages;
    };

    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        totalItems !== 0 &&
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 bg-card border-t border-border mt-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || totalPages === 0}
                    className={`btn flex items-center justify-center min-w-[35px] h-[35px] text-[12px] font-medium rounded-lg transition-all duration-200 ${currentPage === 1 || totalPages === 0
                        ? 'text-text-secondary cursor-not-allowed bg-soft'
                        : 'text-text-primary hover:bg-accent/10 hover:text-accent hover:border-accent/30 bg-card border border-border'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="px-3 py-2 text-text-secondary">...</span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(page)}
                                    disabled={totalPages === 0}
                                    className={`btn min-w-[35px] h-[35px] text-[14px] font-semibold rounded-lg transition-all duration-200 ${currentPage === page
                                        ? 'bg-accent text-white shadow-orange hover:brightness-110'
                                        : totalPages === 0
                                            ? 'text-text-secondary bg-soft cursor-not-allowed'
                                            : 'text-text-primary hover:bg-accent/10 hover:text-accent hover:border-accent/30 bg-card border border-border'
                                        }`}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`btn flex items-center justify-center min-w-[35px] h-[35px] text-[12px] font-medium rounded-lg transition-all duration-200 ${currentPage === totalPages || totalPages === 0
                        ? 'text-text-secondary cursor-not-allowed bg-soft'
                        : 'text-text-primary hover:bg-accent/10 hover:text-accent hover:border-accent/30 bg-card border border-border'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="text-sm text-text-secondary">
                Showing <span className="font-semibold text-text-primary">{startItem}</span> to{' '}
                <span className="font-semibold text-text-primary">{endItem}</span> of{' '}
                <span className="font-semibold text-text-primary">{totalItems}</span> results
            </div>


        </div>
    );
};

export default Pagination;
