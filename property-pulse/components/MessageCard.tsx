"use client";

import React, { useState } from "react";
import type { Message } from "@/types/types";
import { toast } from "react-toastify";

const MessageCard = ({ message }: { message: Message }) => {
  const [isRead, setIsRead] = useState<boolean>(message.read);

  const handleRead = async () => {
    try {
      const res = await fetch(`/api/messages/${message?._id}`, {
        method: "PUT",
      });
      const data = await res.json();

      if (res.status === 200) {
        const { read } = data;
        setIsRead(read);
        const readStatus = read ? "Marked As Read" : "Marked As New";
        toast.success(readStatus);
      }

      if (res.status === 401 || res.status === 400) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error instanceof Error && error.message);
      toast.error(error instanceof Error && error.message);
    }
  };
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
        className={`${!isRead ? "bg-blue-500 text-white" : "bg-gray-400 text-white"} mt-4 mr-3 py-1 px-3 rounded-md`}
        onClick={handleRead}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
