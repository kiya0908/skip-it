'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type AdUnitProps = {
  slot: string;
  format?: string;
  responsive?: "true" | "false";
  className?: string;
};

const AdUnit = ({
  slot,
  format = "auto",
  responsive = "true",
  className = "",
}: AdUnitProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!slot) {
      return;
    }

    try {
      // @ts-ignore Google AdSense is injected globally
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense push error:", error);
    }
  }, [pathname, slot]);

  if (!slot) {
    return null;
  }

  return (
    <div
      key={`${pathname}-${slot}`}
      className={`w-full overflow-hidden text-center ${className}`}
      style={{ minHeight: "100px" }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7718142048250196"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  );
};

export default AdUnit;

