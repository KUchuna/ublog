import { NextRequest, NextResponse } from "next/server";

export type Middleware = (request: NextRequest) => Promise<NextResponse>;

export type MiddlewareFactory = (middleware: Middleware) => Middleware;



export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
}