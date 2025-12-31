import React from "react";

const PropertiesPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <h1>this is the property page with the id of {id}</h1>
    </div>
  );
};

export default PropertiesPage;
