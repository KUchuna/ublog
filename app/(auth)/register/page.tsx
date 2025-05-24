"use client"

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Register() {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        try {
            const { error } = await authClient.signUp.email({
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                name: formData.get('name') as string,
                callbackURL: "/"
            });

            if (error) {
                return
            }
        } catch (error) {
        } finally {
            redirect("/")
        }


    }

    return (
        <div className="bg-accent-200">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input name="name" id="name" className="bg-white"></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input name="email" id="email" type="text" className="bg-white"></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input name="password" id="password" type="password" className="bg-white"></input>
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}