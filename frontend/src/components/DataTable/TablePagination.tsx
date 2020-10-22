import React, { useState, useEffect, useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";
import getPaginationRange from "../../helpers/getPaginationRange";

interface TablePaginationProps {
    total: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: CallableFunction;
}

const TablePagination = ({
    total = 0,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange
}: TablePaginationProps) => {
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (total > 0 && itemsPerPage > 0) {
            setTotalPages(Math.ceil(total / itemsPerPage));
        }
    }, [total, itemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];
        const paginationRange = getPaginationRange({
            current: currentPage,
            total: totalPages
        });

        for (let i = 0; i <= paginationRange.length - 1; i++) {
            const pageNumber = paginationRange[i];

            const getElement = (pageNumber: number) => {
                return pageNumber === -1 ? (
                    <Pagination.Ellipsis key={`${i}-${pageNumber}`}/>
                ) : (
                        <Pagination.Item
                            key={pageNumber}
                            active={pageNumber === currentPage}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </Pagination.Item>
                    );
            };

            pages.push(getElement(pageNumber));
        }

        return pages;
    }, [totalPages, currentPage, onPageChange]);

    if (totalPages === 0) {
        return null;
    }

    return (
        <Pagination>
            <Pagination.First
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            />
            <Pagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {paginationItems}
            <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
            <Pagination.Last
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );
};

export default TablePagination;
