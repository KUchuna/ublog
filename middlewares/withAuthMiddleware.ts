import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import type { CustomMiddleware } from "@/middlewares/chain";

type Session = typeof auth.$Infer.Session;

export function withAuthMiddleware(next: CustomMiddleware): CustomMiddleware {
  return async (request, event, response) => {

    const url = request.nextUrl;
    const { pathname } = url;

    if (pathname.startsWith(`/api/`)) {
        return
    }

    const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!session) {
      const signInUrl = new URL("/login", request.url);
      signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    return next(request, event, response);
  };
}
