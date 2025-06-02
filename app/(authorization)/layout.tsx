import type { Metadata } from "next";
import { redirect } from "next/navigation";
import "@/app/globals.css";
import { getSession } from "@/api";

export const metadata: Metadata = {
  title: "UBlog - Auth",
  description: "Login and register to UBlog",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex w-full h-full justify-center items-center">
      {children}
    </main>
  );
}
