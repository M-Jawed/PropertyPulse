import React from "react";
import type { Property } from "@/types/types";
import ProperyCard from "@/components/ProperyCard";
import { fetchProperties } from "@/utils/requests";

const Properties = async () => {
  const properties: Property[] = await fetchProperties();

  properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
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
              <ProperyCard key={property?._id} property={property} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Properties;
