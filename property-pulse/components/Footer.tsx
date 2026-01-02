import React from "react";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-10">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {year} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
