'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const CURRENT_ROUTE_KEY = 'abf.currentRoute';
const PREVIOUS_ROUTE_KEY = 'abf.previousRoute';

function getFallbackRoute(pathname: string): string {
  if (pathname === '/') return '/';

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length <= 1) return '/';

  const [firstSegment] = segments;
  if (['products', 'services', 'news', 'boutique'].includes(firstSegment)) {
    return `/${firstSegment}`;
  }

  return '/';
}

export default function GlobalBackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const currentRoute = pathname;

  useEffect(() => {
    const previousCurrent = sessionStorage.getItem(CURRENT_ROUTE_KEY);
    if (previousCurrent && previousCurrent !== currentRoute) {
      sessionStorage.setItem(PREVIOUS_ROUTE_KEY, previousCurrent);
    }
    sessionStorage.setItem(CURRENT_ROUTE_KEY, currentRoute);
  }, [currentRoute]);

  if (pathname === '/') {
    return null;
  }

  function handleGoBack() {
    const previousRoute = sessionStorage.getItem(PREVIOUS_ROUTE_KEY);
    if (previousRoute && previousRoute !== currentRoute) {
      router.push(previousRoute);
      return;
    }

    const sameOriginReferrer = typeof document !== 'undefined'
      ? document.referrer && new URL(document.referrer).origin === window.location.origin
      : false;

    if (window.history.length > 1 && sameOriginReferrer) {
      router.back();
      return;
    }

    router.push(getFallbackRoute(pathname));
  }

  return (
    <div className="globalBackWrap">
      <button type="button" className="globalBackButton" onClick={handleGoBack}>
        <svg className="globalBackButtonIcon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Retour</span>
      </button>
    </div>
  );
}