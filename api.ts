"use server"
import { headers } from "next/headers";

export async function createBlog(
  title: string,
  content: string,
  description: string,
  user_id: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/create-post`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, description, user_id }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create blog");
  }
  
  return await response.json();
}

export async function getBlogs() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-blogs`);

      const data = await response.json();
      return data.blogs;
    } catch (error) {
      console.error("getBlogs error:", error);
    }
}

export async function getSingleBlog(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-single-blog/${id}`, {
    headers: await headers()
  });
  const blog = await response.json();
  
  return blog.blog;
}