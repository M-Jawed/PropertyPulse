"use client";

import React, { useState, useEffect, FormEventHandler } from "react";
import type { Property } from "@/types/types";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type ContactFields = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

const ContactForm = ({ property }: { property: Property | null }) => {
  const [contactFields, setContactFields] = useState<ContactFields>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const dataObj = {
        name: contactFields.name,
        email: contactFields.email,
        phone: contactFields.phone,
        message: contactFields.message,
        recipient: property?.owner,
        property: property?._id,
      };

      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });
      const data = await res.json();

      if (res.status === 200) {
        toast.success(data.message);
        setWasSubmitted(true);
      }

      if (res.status === 401 || res.status === 400) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    } finally {
      setContactFields({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {!session ? (
        <p>You must be logged in to send a message.</p>
      ) : wasSubmitted ? (
        <p className="text-green-500">Message sent succesfully</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={contactFields.name}
              onChange={(e) =>
                setContactFields((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={contactFields.email}
              onChange={(e) =>
                setContactFields((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={contactFields.phone}
              onChange={(e) =>
                setContactFields((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              value={contactFields.message}
              onChange={(e) =>
                setContactFields((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
