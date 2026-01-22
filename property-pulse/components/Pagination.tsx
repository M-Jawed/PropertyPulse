"use client";

import React, { useState, useEffect } from "react";

const Pagination = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) onPageChange(newPage);
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className={`mr-2 px-2 py-1 border border-gray-300 rounded bg-blue-600 text-white ${page === 1 ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-blue-700 disabled:bg-blue-300`}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        className={`ml-2 px-2 py-1 border border-gray-300 rounded bg-blue-600 text-white ${page === totalPages ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-blue-700 disabled:bg-blue-300`}
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
