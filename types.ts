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

export interface BlogPost {
    title: string;
    body: string;
    id: number;
    author: string;
    createdat: string;
    description: string;
}