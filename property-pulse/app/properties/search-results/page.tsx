"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Property } from "@/types/types";
import Spinner from "@/components/Spinner";
import ProperyCard from "@/components/ProperyCard";
import SearchForm from "@/components/SearchForm";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  const fetchSearchResults = async () => {
    try {
      const res = await fetch(
        `/api/properties/search?location=${location?.toLowerCase()}&propertyType=${propertyType?.toLocaleLowerCase()}`,
      );
      const data = await res.json();

      if (res.status === 200) {
        setProperties(data);
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [location, propertyType]);

  if (loading) return <Spinner loading={loading} />;

  return (
    <section>
      <div className="bg-blue-700 py-6">
        <SearchForm />
      </div>

      <div className="px-10 mt-10">
        <Link
          className="flex items-center gap-2 text-blue-700 cursor-pointer"
          href={"/properties"}
        >
          <FaArrowAltCircleLeft /> Back to properties
        </Link>
      </div>

      <div className="px-4 py-6">
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
                <ProperyCard key={property?._id} property={property} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResultsPage;
