"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Property } from "@/types/types";

const SearchResultsPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  const fetchSearchResults = async () => {
    try {
      const res = await fetch(
        `/api/properties/search?location=${location?.toLowerCase()}&propertyType=${propertyType?.toLocaleLowerCase()}`
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
  }, []);
  return (
    <div>
      <p>Search results page</p>
    </div>
  );
};

export default SearchResultsPage;
