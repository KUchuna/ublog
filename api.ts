"use server"
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getSession() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return null
        }
        
        return session && session
        
    } catch (error) {
        console.log(error);
    }
}

export async function createBlog(
  title: string,
  content: string,
  user_id: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/create-post`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, user_id }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create blog");
  }

  return await response.json();
}

export async function getBlogs() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-blogs`, {
      headers: await headers()
    })
    const { blogs } = await response.json();
    return blogs.rows;
}