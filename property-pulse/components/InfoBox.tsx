import React from "react";
import Link from "next/link";
import type { InfoBox } from "@/types/types";

const InfoBox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-black",
  buttinInfo,
  children,
}: InfoBox) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-bold ${textColor}`}> {heading} </h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={buttinInfo?.link}
        className={`inline-block ${buttinInfo?.backgroundColor} ${buttinInfo?.textColor} rounded-lg px-4 py-2 hover:${buttinInfo?.hover}`}
      >
        {buttinInfo?.text}
      </Link>
    </div>
  );
};

export default InfoBox;
