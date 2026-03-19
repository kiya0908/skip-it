//设置中间件 middleware.ts，在请求进入 app/games/[slug]/page.tsx 之前，
// 直接把 /games/skip_it 和 /games/skip-it 重定向到 /，并显式返回 301
import { NextRequest, NextResponse } from 'next/server';

const LEGACY_HOME_REDIRECTS = new Set(['/games/skip_it', '/games/skip-it']);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, '') || '/';

  if (LEGACY_HOME_REDIRECTS.has(pathname)) {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/games/:path*'],
};
