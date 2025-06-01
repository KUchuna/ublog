import { NextResponse } from "next/server";
import type { CustomMiddleware } from "@/middlewares/chain";

export function withApiMiddleware(next: CustomMiddleware): CustomMiddleware {
  return (request, event, response) => {
    const { pathname } = request.nextUrl;
    const referer = request.headers.get("referer") || "";
    const expected = process.env.NEXT_PUBLIC_URL ?? "";

    console.log("withApiMiddleware", referer)

    if (pathname.startsWith(`/api/get`) && !referer.includes(expected)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return next(request, event, response);
  };
}
