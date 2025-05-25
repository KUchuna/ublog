"use client"

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Loading from "@/components/Globals/Loading";


export default function Register() {

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const _ = await authClient.signUp.email({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            name: formData.get('name') as string,
            callbackURL: "/"
        },{
            onRequest: (ctx) => {
                setLoading(true)
            },
            onSuccess: (ctx) => {
                router.refresh();
                redirect("/")
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error?.message);
                setLoading(false);
            }
        })
    }

    return (
        <div className="flex justify-center items-center">
            <div className="flex gap-10 rounded-2xl shadow-2xl overflow-hidden max-w-[70%] w-full">
                <Image src="/images/authimage.png" alt="logo" width={2000} height={2000} className="w-[60%]"/>
                <div className="w-full py-10 px-5 pr-15">
                    <h1 className="text-5xl font-bold">Welcome!</h1>
                    <p className="font-sm text-gray-500 my-5">Please create an account to continue.</p>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Name</label>
                            <input name="name" id="name" className="bg-white border border-gray-300 focus:border-secondary outline-none rounded-lg px-2 py-2" placeholder="John Smith"></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input name="email" id="email" type="text" className="bg-white border border-gray-300 focus:border-secondary outline-none rounded-lg px-2 py-2" placeholder="you@example.com"></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input name="password" id="password" type="password" className="bg-white border border-gray-300 focus:border-secondary outline-none rounded-lg px-2 py-2" placeholder="Enter your password"></input>
                        </div>
                        <button className={`bg-main text-white font-bold rounded-lg py-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center`} disabled={loading}>{loading ? <Loading /> : "Register"}</button>
                    </form>
                    <p className="text-sm text-center mt-10">Already have an account? <Link href="/login" className="font-bold text-main">Log in here</Link></p>
                </div>
            </div>
        </div>
    )
}