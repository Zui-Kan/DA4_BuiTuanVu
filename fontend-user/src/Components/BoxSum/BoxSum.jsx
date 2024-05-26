import React from "react";
import "./BoxSum.css";

export function BoxSum({ currentPage, totalPages, onPageChange }) {
  const changePage = (page) => {
    if (page === "prev" && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else if (page === "next" && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    } else if (typeof page === "number") {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 5);
    const endPage = Math.min(totalPages, startPage + 9);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={currentPage === i ? "active-page" : ""}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="box-sum">
      <div className="box-all">
        <button
          className="box-right-left"
          onClick={() => changePage("prev")}
          disabled={currentPage === 1}
        >
          <img src="../IMAGE/icons8_back_52px.png" alt="" />
        </button>
        {renderPageNumbers()}
        <button
          className="box-right-left"
          onClick={() => changePage("next")}
          disabled={currentPage === totalPages}
        >
          <img src="../IMAGE/icons8_forward_52px.png" alt="" />
        </button>
      </div>
    </div>
  );
}
