import React from "react";
import properties from "@/properties.json";
import type { Property } from "@/types/types";

const Properties = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <h1> {property.name} </h1>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
