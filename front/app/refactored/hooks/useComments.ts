"use client";

import { useEffect, useRef, useState } from "react";
import { API_BASE } from "../constants";
import type { Comment } from "../types";

export function useComments(leadId: number | undefined) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [openComments, setOpenComments] = useState(true);
  const commentsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!leadId) return;

    const fetchComments = async () => {
      const res = await fetch(`${API_BASE}/cards/${leadId}/comments`);
      const data = await res.json();
      setComments(data);
    };

    fetchComments();
  }, [leadId]);

  useEffect(() => {
    if (!openComments) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        commentsRef.current &&
        !commentsRef.current.contains(e.target as Node)
      ) {
        setOpenComments(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [openComments]);

  return { comments, openComments, setOpenComments, commentsRef };
}