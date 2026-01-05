"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { Property } from "@/types/types";
import { fetchPropertyById } from "@/utils/requests";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProperty = async () => {
    if (!id) return;

    try {
      const property = await fetchPropertyById(id as string);
      if (!property) {
        console.error("No property with that id found");
        return [];
      }
      setProperty(property);
    } catch (error) {
      console.error("Failed to fetch", error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (property === null) {
      fetchProperty();
    }
  }, [id, property]);
  return (
    <div>
      <h1>
        This is the page with the id of {id} {property?.name}{" "}
      </h1>
    </div>
  );
};

export default PropertyDetailsPage;
