import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
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

	return NextResponse.next();
}

export const config = {
    matcher: [
        "/newblog/:path*",
        "/profile/:path*"   
    ]
}