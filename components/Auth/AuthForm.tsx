"use client"

import Image from "next/image";
import Loading from "@/components/Globals/Loading";
import Link from "next/link";
import { z } from "zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { APIError } from "better-auth/api";
import { AuthFormProps } from "@/types";

const LoginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(8, "Password should be at least 8 characters long")
})

const RegisterSchema = z.object({
    name: z.string().max(12,"Maximum 15 characters").refine(val => val.replace(/\s/g, '').length >= 5, {
        message: "Name must be at least 5 characters long",
    }),
    email: z
        .string()
        .email("Invalid email address")
        .min(1, "Email is required")
        .max(150, "Email must not exceed 150 characters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .refine(
            (val) =>
            /[A-Z]/.test(val) &&
            /[a-z]/.test(val) &&
            /[0-9]/.test(val) &&  
            /[^A-Za-z0-9]/.test(val),
            {
            message: "Password must include uppercase letter, lowercase letter, 1 number, and 1 special character",
            }
        )
});

export default function AuthForm({ handleLogin, handleSignUp, registration} : AuthFormProps) 
    {

    const [errors, setErrors] = useState<{[key: string]: string}>({})
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const router = useRouter()

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"



    async function handleValidation(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setNotFound(false)
        setErrors({})

        const formData = new FormData(e.currentTarget)

        const result = registration ? 
        RegisterSchema.safeParse({
            name: formData.get('name'),
            password: formData.get('password'),
            email: formData.get('email'),
        })
            : 
        LoginSchema.safeParse({
            password: formData.get('password'),
            email: formData.get('email'),
        })

        if (!result.success) {
            const fieldErrors: { [key: string]: string } = {};
            result.error.errors.forEach((error) => {
                if (error.path.length > 0) {
                    fieldErrors[error.path[0]] = error.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        try {
            setLoading(true);
            if (!registration) {
                if (handleLogin) {
                    const response = await handleLogin(formData)
                    if (response) {
                        router.push(callbackUrl)
                    } else {
                        setNotFound(true);
                    }
                }
            } else {
                if(handleSignUp) {
                    const response = await handleSignUp(formData)
                    if (response) {
                        router.push(callbackUrl)
                    }
                }
            }
        } catch (error) {
            throw error
        }

        setLoading(false);
    }

    return (
        <>  
            <div className="flex w-full max-w-[1200px] xl:h-[70%] [@media(max-height:805px)]:h-[90%] 2xl:h-[70%] rounded-2xl shadow-2xl overflow-hidden bg-white">
                <div className="w-[60%] relative">
                    <Image
                        src="/images/authimage.png"
                        alt="logo"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="w-[40%] py-10 px-10 flex flex-col justify-center h-full">
                    <h1 className="text-5xl font-bold">{registration ? "Welcome!" : "Welcome back!"}</h1>
                    <p className="font-sm text-gray-500 my-5">{registration ? "Please register to continue." : "Please login to continue."}</p>
                    <form onSubmit={handleValidation} className="w-full flex flex-col gap-3 my-auto">
                        <input type="hidden" name="callbackUrl" value={callbackUrl} />
                        {registration && (
                            <div className="flex flex-col">
                                <label htmlFor="name">Username</label>
                                <input name="name" id="name" className={`bg-white border focus:border-secondary outline-none rounded-lg px-2 py-2 ${errors.name ? "border-red-rich" : "border-gray-300"}`} placeholder="John Smith"></input>
                                {errors.name && <p className="text-sm text-red-rich italic">{errors.name}</p>}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input name="email" id="email" type="text" className={`bg-white border  focus:border-secondary outline-none rounded-lg px-2 py-2 ${errors.email || notFound ? "border-red-rich" : "border-gray-300"}`} placeholder="you@example.com"></input>
                            {errors.email && <p className="text-sm text-red-rich italic">{errors.email}</p>}
                            {notFound && <p className="text-sm text-red-rich italic">No such credentials were found</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input name="password" id="password" type="password" className={`bg-white border focus:border-secondary outline-none rounded-lg px-2 py-2 ${errors.password || notFound ? "border-red-rich" : "border-gray-300"}`} placeholder="Enter your password"></input>
                            {errors.password && <p className="text-sm text-red-rich italic">{errors.password}</p>}
                        </div>
                        {!registration &&
                            <div className="flex flex-row-reverse mr-auto gap-2 mt-4 mb-2">
                                <label htmlFor="remember" className="cursor-pointer">Remember me</label>
                                <input name="remember" id="remember" type="checkbox"></input>
                            </div>
                        }
                        <button className={`bg-main text-white font-bold rounded-lg py-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center hover:bg-main-hover shadow-xl mt-2`} disabled={loading}>{loading ? <Loading /> : (registration ? "Register" : "Log in")}</button>
                    </form>
                    <p className="text-sm text-center mt-4">{registration ? "Already have an account?" : "Don't have an account?"} <Link href={`${registration ? "/login" : "/register"}`} className="font-bold text-main hover:text-main-hover">{registration ? "Log in here" : "Sign up here"}</Link></p>
                </div>
            </div>
        </>
    )
}