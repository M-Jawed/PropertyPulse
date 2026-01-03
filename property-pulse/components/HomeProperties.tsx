import React from "react";
import Image from "next/image";
import Link from "next/link";
import properties from "@/properties.json";
import { FaMoneyBill } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaRulerCombined } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const HomeProperties = () => {
  const randomProperties = properties.sort(() => Math.random() - Math.random());
  const sliceProperties = randomProperties.slice(0, 3);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sliceProperties.length === 0 ? (
            <div>
              <p>No properties found</p>
            </div>
          ) : (
            sliceProperties.map((property) => {
              const getRatesDisplay = () => {
                const { rates } = property;

                if (rates.nightly) return `${rates.nightly}/night`;

                if (rates.monthly) return `${rates.monthly}/mo`;

                if (rates.weekly) return `${rates.weekly}/wk`;
              };
              return (
                <div
                  key={property?._id}
                  className="rounded-xl shadow-md relative"
                >
                  <Image
                    src={`/properties/${property.images[0]}`}
                    width={0}
                    height={0}
                    alt=""
                    className="w-full h-auto rounded-t-xl"
                  />
                  <div className="p-4">
                    <div className="text-left md:text-center lg:text-left mb-6">
                      <div className="text-gray-600"> {property?.type} </div>
                      <h3 className="text-xl font-bold"> {property?.name} </h3>
                    </div>
                    <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
                      ${getRatesDisplay()}
                    </h3>

                    <div className="flex justify-center gap-4 text-gray-500 mb-4">
                      <p>
                        <FaBed className="inline mr-2" /> {property.beds}{" "}
                        <span className="md:hidden lg:inline">Beds</span>
                      </p>
                      <p>
                        <FaBath className="inline mr-2" /> {property.baths}{" "}
                        <span className="md:hidden lg:inline">Baths</span>
                      </p>
                      <p>
                        <FaRulerCombined className="inline mr-2" />
                        {property.square_feet}{" "}
                        <span className="md:hidden lg:inline">sqft</span>
                      </p>
                    </div>

                    <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                      {property.rates.nightly && (
                        <p>
                          <FaMoneyBill className="inline mr-2" /> Nightly
                        </p>
                      )}
                      {property.rates.weekly && (
                        <p>
                          <FaMoneyBill className="inline mr-2" /> Weekly
                        </p>
                      )}
                      {property.rates.monthly && (
                        <p>
                          <FaMoneyBill className="inline mr-2" /> Monthly
                        </p>
                      )}
                    </div>

                    <div className="border border-gray-100 mb-5"></div>

                    <div className="flex flex-col lg:flex-row justify-between mb-4">
                      <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <FaMapMarkerAlt className="inline mt-1" fill="red" />
                        <span className="text-orange-700">
                          {" "}
                          {property.location.city} {property.location.state}{" "}
                        </span>
                      </div>
                      <Link
                        href={`properties/${property?._id}`}
                        className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeProperties;
