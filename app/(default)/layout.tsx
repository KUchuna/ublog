import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Globals/Header/Header";

export const metadata: Metadata = {
  title: "UBlog",
  description: "Blog your world.",
};

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-col px-16 py-4 justify-center items-center">
        {children}
      </main>
    </>
  );
}
