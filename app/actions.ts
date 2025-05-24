"use server"

import { auth } from "@/lib/auth.ts";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";


export async function registerAction(formdata:FormData) {

    const {name, email, password} = Object.fromEntries(formdata)

    try {
        const { data, error } = await authClient.signUp.email({
            name: name as string,
            email: email as string,
            password: password as string,
            callbackURL: "/"
        });
        if (error) {
            console.log(error)
            return
        }
        console.log(data)
    } catch (error) {
        console.log(error)
    } finally {
        revalidatePath('/')
        redirect("/")
    }
}

export async function signoutAction() {
    try {
        const response = await auth.api.signOut({
        headers: await headers()
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    } finally {
        revalidatePath('/')
        redirect('/')
    }
}