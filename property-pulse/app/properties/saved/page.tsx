"use client";

import React from "react";
import { useState, useEffect } from "react";
import type { Property } from "@/types/types";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import ProperyCard from "@/components/PropertyCard";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getBookmarks = async () => {
    try {
      const res = await fetch(`/api/properties/bookmarks`);
      const data = await res.json();

      if (res.status === 200) {
        setProperties(data.bookmarks);
      } else {
        console.error(res.statusText);
        toast.error("Failed to get saved properties.");
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties?.length === 0 ? (
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
    </section>
  );
};

export default SavedPropertiesPage;
