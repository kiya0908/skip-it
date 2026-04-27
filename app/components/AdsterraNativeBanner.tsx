'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ADSTERRA_NATIVE_CONTAINER_ID =
  process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID || '';
const ADSTERRA_NATIVE_SCRIPT_SRC =
  process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT_SRC || '';

type AdsterraNativeBannerProps = {
  className?: string;
};

export default function AdsterraNativeBanner({
  className = '',
}: AdsterraNativeBannerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!ADSTERRA_NATIVE_CONTAINER_ID || !ADSTERRA_NATIVE_SCRIPT_SRC) {
      return;
    }

    const container = document.getElementById(ADSTERRA_NATIVE_CONTAINER_ID);
    if (!container) {
      return;
    }

    container.innerHTML = '';

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = ADSTERRA_NATIVE_SCRIPT_SRC;
    script.dataset.adsterraNative = ADSTERRA_NATIVE_CONTAINER_ID;

    document.body.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = '';
    };
  }, [pathname]);

  if (!ADSTERRA_NATIVE_CONTAINER_ID || !ADSTERRA_NATIVE_SCRIPT_SRC) {
    return null;
  }

  return (
    <div
      className={`w-full overflow-hidden text-center ${className}`}
      style={{ minHeight: '250px' }}
    >
      <div id={ADSTERRA_NATIVE_CONTAINER_ID} />
    </div>
  );
}
