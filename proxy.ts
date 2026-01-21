import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import { TENANT_ID_HEADER } from "./lib/constants";

export async function proxy(request: NextRequest) {
  const budgetSpent = process.env.BUDGET_SPENT === "true";

  if (budgetSpent) {
    return NextResponse.redirect(new URL("/budget-spent", request.url));
  }

  const tenantIdSearchParam = request.nextUrl.searchParams.get("tenant_id");

  if (tenantIdSearchParam) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(TENANT_ID_HEADER, tenantIdSearchParam);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const isOld = request.nextUrl.pathname.startsWith("/chat");

  if (isOld) {
    if (request.nextUrl.pathname === "/chat") {
      return NextResponse.redirect(new URL(`/`, request.url));
    }

    const secondPart = request.nextUrl.pathname.split("/")[2];

    const newPath = `/session?party_id=${secondPart}`;

    return NextResponse.redirect(new URL(newPath, request.url));
  }
}

export const config = {
  matcher: ["/", "/chat/:path*", "/session/:path*"],
};
