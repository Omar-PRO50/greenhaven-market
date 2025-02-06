"use client"; // This ensures the hook is client-side only

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function usePortal(selector: string) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component mounts (client-side)
  }, []);

  if (mounted) {
    const element = document.querySelector(selector);
    if (element) {
      return (children: React.ReactNode) => createPortal(children, element);
    }
  }

  return () => null; // Return a no-op function if not mounted or element not found
}
