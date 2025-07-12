import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UBlog",
  description: "Blog your world.",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      {children}
    </>
  );
}
