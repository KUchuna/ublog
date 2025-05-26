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
      <main className="flex flex-col justify-center items-center py-8">
        {children}
      </main>
    </>
  );
}
