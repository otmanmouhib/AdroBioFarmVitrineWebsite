'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const ROUTE_STACK_KEY = 'abf.routeStack';

function readRouteStack(): string[] {
  try {
    const raw = sessionStorage.getItem(ROUTE_STACK_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is string => typeof item === 'string' && item.length > 0);
  } catch {
    return [];
  }
}

function writeRouteStack(stack: string[]) {
  sessionStorage.setItem(ROUTE_STACK_KEY, JSON.stringify(stack));
}

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
    const stack = readRouteStack();

    if (stack.length === 0) {
      writeRouteStack([currentRoute]);
      return;
    }

    const lastRoute = stack[stack.length - 1];
    if (lastRoute === currentRoute) {
      return;
    }

    const secondToLastRoute = stack.length > 1 ? stack[stack.length - 2] : null;
    if (secondToLastRoute === currentRoute) {
      // Route changed because browser history moved backward.
      stack.pop();
      writeRouteStack(stack);
      return;
    }

    stack.push(currentRoute);
    writeRouteStack(stack);
  }, [currentRoute]);

  if (pathname === '/') {
    return null;
  }

  function handleGoBack() {
    const stack = readRouteStack();
    if (stack.length > 1) {
      stack.pop();
      const targetRoute = stack[stack.length - 1];
      writeRouteStack(stack);

      if (targetRoute && targetRoute !== currentRoute) {
        router.push(targetRoute);
        return;
      }
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