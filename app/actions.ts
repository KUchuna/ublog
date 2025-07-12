"use server"

import { auth } from "@/lib/auth.ts";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createBlog } from "@/api";
import { APIError } from "better-auth/api";


export async function signInAction({ email, password, rememberMe, callbackUrl}
    : {email: string, password: string, rememberMe: boolean, callbackUrl: string}
) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (session) {
        return
    } else {
        try {
            const response = await auth.api.signInEmail({
                body: { email, password, rememberMe, callbackURL: callbackUrl },
                headers: await headers(),
                asResponse: true
            });
    
            if (response.status === 200) {
                return { success: true};
            }
    
        } catch (error) {
            if (error instanceof APIError) {
                return error
            }
        }
    }

}

export async function signUpAction({ name, email, password } : {name: string, email: string, password: string}) {


    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (session) {
        return
    } else {
        try {
            const response = await auth.api.signUpEmail({
                body: {name, email, password},
                headers: await headers(),
                asResponse: true
            });
    
            if (response.status === 200) {
                return { success: true};
            }
    
        } catch (error) {
            return
        }
    }

}

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

export async function createBlogAction({title, content, description, user_id}: {title:string, content:string, description:string, user_id: string}) {
    "use server"
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        console.log("You must be logged in to create a blog post")
        return
    } 

    try {
        const _ = await createBlog(title, content, description, user_id);
    } catch (error) {
        console.error(error);
        return;
    }
    

}

