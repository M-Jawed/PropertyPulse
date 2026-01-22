import React from "react";
import type { Property } from "@/types/types";
import ProperyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
import SearchForm from "@/components/SearchForm";
import Properties from "@/components/Properties";

const PropertiesPage = async () => {
  return (
    <>
      <section>
        <div className="bg-blue-700 py-6">
          <SearchForm />
        </div>
      </section>

      <Properties />
    </>
  );
};

export default PropertiesPage;
