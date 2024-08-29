"use client";

import { useState, useEffect } from "react";
import Token from "@/utility/token";

export default function ViewContent() {
  const [contenttt, setContenttt] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/articles/read/SS", {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        });

        if (response.ok) {
          const data = await response.text();
          setContenttt(data);
        } else {
          console.error("Failed to fetch content.");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      <h2>Saved Content</h2>
      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: contenttt }}
      />
    </div>
  );
}
