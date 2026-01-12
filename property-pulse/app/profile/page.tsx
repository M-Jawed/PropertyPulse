"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import profileDefault from "@/assets/images/profile.png";
import { useSession } from "next-auth/react";
import type { Property } from "@/types/types";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState<Property[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserProperties = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/properties/user/${session?.user?.id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/properties/${id}`,
        { method: "DELETE" }
      );

      if (res.status === 200) {
        const updatedProperties = properties?.filter(
          (property) => property?._id.toString() !== id
        );
        if (!updatedProperties) return;
        setProperties(updatedProperties);
        toast.success("Property Deleted");
      } else {
        toast.error("Failed to delete poperty");
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      toast.error("Failed to delete property");
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      getUserProperties();
    }
  }, [session]);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  width={400}
                  height={300}
                  alt="User"
                  priority={true}
                  loading="eager"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {loading && properties?.length === 0 && (
                <p>You have no property listed.</p>
              )}

              {loading && <Spinner loading={loading} />}

              {!loading &&
                properties?.map((property) => (
                  <div key={property?._id} className="mb-10">
                    <Link href={`/properties/${property?._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property?.images[0]}
                        width={500}
                        height={100}
                        alt=""
                        priority={true}
                        loading="eager"
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">
                        {" "}
                        {property?.name}{" "}
                      </p>
                      <p className="text-gray-600">
                        Address: {property?.location?.street},{" "}
                        {property?.location?.city}, {property?.location?.state},{" "}
                        {property?.location.zipcode}{" "}
                      </p>
                    </div>
                    <div className="mt-2">
                      <a
                        href="/add-property.html"
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </a>
                      <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                        onClick={() => handleDelete(property?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
