"use client";

import React, { useState } from "react";
import type { Message } from "@/types/types";
import { toast } from "react-toastify";
import { useGlobal } from "@/context/GlobalContext";

const MessageCard = ({ message }: { message: Message }) => {
  const [isRead, setIsRead] = useState<boolean>(message.read);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { setUnreadCount } = useGlobal();

  const handleRead = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/${message?._id}`, {
        method: "PUT",
      });
      const data = await res.json();

      if (res.status === 200) {
        const { read } = data;
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        const readStatus = read ? "Marked As Read" : "Marked As New";
        toast.success(readStatus);
      }

      if (res.status === 401 || res.status === 400) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error instanceof Error && error.message);
      toast.error(error instanceof Error && error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/${message?._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.status === 200) {
        toast.success(data.message);
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
      }

      if (res.status === 401 || res.status === 400) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error instanceof Error && error.message);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isDeleted) return null;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-orange-300 rounded-lg px-2 py-1 text-white">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message?.property.name ?? "No name found"}
      </h2>
      <p className="text-gray-700">{message?.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message?.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href="mailto:recipient@example.com" className="text-blue-500">
            {" "}
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {" "}
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        className={`${!isRead ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-white hover:bg-gray-500"} mt-4 mr-3 py-1 px-3 rounded-md cursor-pointer`}
        onClick={handleRead}
        disabled={loading}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 cursor-pointer"
        disabled={loading}
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
