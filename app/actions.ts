"use server"

import { auth } from "@/lib/auth.ts";
//import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";


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