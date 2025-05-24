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