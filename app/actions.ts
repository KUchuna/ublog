"use server"

import { auth } from "@/lib/auth.ts";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createBlog } from "@/api";


export async function signoutAction() {
    try {
        const _ = await auth.api.signOut({
        headers: await headers()
        })
    } catch (error) {
        console.log(error)
    } finally {
        revalidatePath('/')
        redirect('/')
    }
}

export async function createBlogAction({title, content, user_id}: {title:string, content:string, user_id: string}) {

    try {
    const _ = await createBlog(title, content, user_id);
  } catch (error) {
    console.error(error);
    return;
  }
}