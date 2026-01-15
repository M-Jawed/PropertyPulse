"use client";

import React, { useState, useEffect } from "react";
import type { Property } from "@/types/types";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";

const PropertyMap = ({ property }: { property: Property }) => {
  const [lng, setLng] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [geocodeError, setGeocodeError] = useState<boolean>(false);
  const addressParts = [
    property?.location.street,
    property?.location.city,
    property?.location.state,
    property?.location.zipcode,
  ].filter(Boolean);
  const address = addressParts.join(" ");
  const encodedAddress = encodeURIComponent(address);

  const getGeocode = async () => {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API}`
      );
      const data = await res.json();

      if (data.features.length === 0) {
        setGeocodeError(true);
        setLoading(false);
        return;
      }

      setLng(data.features[0].geometry.coordinates[0]);
      setLat(data.features[0].geometry.coordinates[1]);
      setLoading(false);
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      setGeocodeError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!address) return;
    getGeocode();
  }, [address]);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) return <h1>No location data found for that address.</h1>;

  return (
    !loading && (
      <Map
        initialViewState={{
          longitude: lng as number,
          latitude: lat as number,
          zoom: 14,
        }}
        style={{ width: "100%", height: "400px" }}
        mapStyle={`https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API}`}
      >
        <Marker longitude={lng as number} latitude={lat as number}>
          <Image
            src={pin}
            alt="Marker pin for the map"
            width={32}
            height={32}
          />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
