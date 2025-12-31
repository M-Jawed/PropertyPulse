import React from "react";

const PropertiesPageRooms = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <h1>This is the rooms page with continuation of the id {id} </h1>
    </div>
  );
};

export default PropertiesPageRooms;
