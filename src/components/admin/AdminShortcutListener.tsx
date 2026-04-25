"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AdminShortcutListener() {
  const router = useRouter();

  useEffect(() => {
    const handleAdminShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.code === "KeyF") {
        event.preventDefault();
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleAdminShortcut);

    return () => {
      window.removeEventListener("keydown", handleAdminShortcut);
    };
  }, [router]);

  return null;
}
