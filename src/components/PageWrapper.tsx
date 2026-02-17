"use client";

import { useLayoutEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Loading from "@/components/Loading";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
}
