'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

// GA4/GTM - Remplacer par votre ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}
