import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TENANT_ID_HEADER } from "./lib/constants";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Handle budget spent redirect
  const budgetSpent = process.env.BUDGET_SPENT === "true";

  if (budgetSpent) {
    // Extract locale from pathname or use default
    const pathnameLocale = request.nextUrl.pathname.split("/")[1];
    const locale = routing.locales.includes(pathnameLocale as any)
      ? pathnameLocale
      : routing.defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}/budget-spent`, request.url),
    );
  }

  // Handle tenant ID
  const tenantIdSearchParam = request.nextUrl.searchParams.get("tenant_id");

  if (tenantIdSearchParam) {
    const response = intlMiddleware(request);
    response.headers.set(TENANT_ID_HEADER, tenantIdSearchParam);
    return response;
  }

  // Handle legacy /chat routes
  const isOld = request.nextUrl.pathname.startsWith("/chat");

  if (isOld) {
    const pathnameLocale = request.nextUrl.pathname.split("/")[1];
    const locale = routing.locales.includes(pathnameLocale as any)
      ? pathnameLocale
      : routing.defaultLocale;

    if (request.nextUrl.pathname === "/chat") {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    const secondPart = request.nextUrl.pathname.split("/")[2];
    const newPath = `/${locale}/session?party_id=${secondPart}`;

    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Apply i18n middleware for all other requests
  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
