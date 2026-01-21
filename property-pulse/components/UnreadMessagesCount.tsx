"use client";

import React, { useEffect, useState } from "react";
import type { Session } from "next-auth";
import { useGlobal } from "@/context/GlobalContext";

const UnreadMessagesCount = ({ session }: { session: Session }) => {
  const { unreadCount, setUnreadCount } = useGlobal();

  const fetchUnreadMessages = async () => {
    try {
      const res = await fetch("/api/messages/unread-count");
      const data = await res.json();

      if (res.status === 200) {
        setUnreadCount(data);
      }
    } catch (error) {
      console.error(error instanceof Error && error.message);
    }
  };

  useEffect(() => {
    if (!session) return;

    fetchUnreadMessages();
  }, [session]);

  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
};

export default UnreadMessagesCount;
