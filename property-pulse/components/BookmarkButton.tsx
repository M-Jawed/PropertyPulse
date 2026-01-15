"use client";

import React from "react";
import type { Property } from "@/types/types";
import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property }: { property: Property | null }) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const checkBookmark = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const res = await fetch("/api/bookmarks/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyId: property?._id }),
    });
    const data = await res.json();

    if (res.status === 200) {
      setBookmarked(data.isBookmarked);
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!userId) {
      toast.error("You need to be signed in first");
      return;
    }
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: property?._id }),
      });
      const data = await res.json();

      if (res.status === 200) {
        toast.success(data.message);
        setBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    checkBookmark();
  }, [property?._id, userId]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <button
      onClick={handleBookmark}
      className={`${
        bookmarked
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className="mr-2" />{" "}
      {bookmarked ? "Remove Bookmark" : "Bookmark Property"}
    </button>
  );
};

export default BookmarkButton;
