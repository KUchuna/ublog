import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "UBlog - Auth",
  description: "login and register to Ublog",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full h-full justify-center items-center">
        {children}
    </main>
  );
}
