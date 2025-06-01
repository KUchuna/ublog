import type { Metadata } from "next";
import "@/app/globals.css";
import { getSession } from "@/api";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "UBlog - Auth",
  description: "login and register to Ublog",
};

const session = await getSession()

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  if (session) {
    return redirect("/");
  }

  return (
    <main className="flex w-full h-full justify-center items-center">
        {children}
    </main>
  );
}
