"use client";

import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Loading from "@/components/Loading";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

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
