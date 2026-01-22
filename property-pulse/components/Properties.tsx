"use client";

import React, { useState, useEffect } from "react";
import type { Property } from "@/types/types";
import Spinner from "./Spinner";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);

  const fetchProperties = async () => {
    try {
      const res = await fetch(
        `/api/properties?page=${page}&pageSize=${pageSize}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await res.json();
      setTotal(data.total);

      setProperties(data.properties);
    } catch (error) {
      console.log(error instanceof Error && error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  if (properties)
    properties.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  useEffect(() => {
    fetchProperties();
  }, [page, pageSize]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length === 0 ? (
              <div className="w-full h-screen">
                <p className="w-full text-center text-4xl font-medium">
                  No properties found
                </p>
              </div>
            ) : (
              properties.map((property: Property) => (
                <PropertyCard key={property?._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={total}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Properties;
