"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Property } from "@/types/types";
import { fetchPropertyById } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import ContactForm from "@/components/ContactForm";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";

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
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && !property && (
        <div>
          <h1 className="text-4xl font-medium">No propert found.</h1>
        </div>
      )}

      <PropertyHeaderImage image={property?.images[0] as string} />

      {/* GO back to properties */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="fas fa-arrow-left mr-2" /> Back to
            Properties
          </Link>
        </div>
      </section>

      {/* Properties Info */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
            <PropertyDetails property={property as Property} />
            {/* <!-- Sidebar --> */}
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <ContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>

      <PropertyImages images={property?.images} />
    </>
  );
};

export default PropertyDetailsPage;
