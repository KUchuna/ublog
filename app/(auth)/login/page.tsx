"use client"

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { z } from "zod";
import AuthForm from "@/components/Auth/AuthForm";

const LoginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(8, "Password is required")
})

export default function Login() {

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<{[key: string]: string}>({})
    const [notFound, setNotFound] = useState(false)

    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const result = LoginSchema.safeParse({
            name: formData.get('name'),
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

        const _ = await authClient.signIn.email({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            callbackURL: "/dashboard",
            rememberMe: formData.get('remember') === "on" ? true : false
        }, {
            onRequest: () => {
                setLoading(true)
                setErrors({});
                setNotFound(false);
            },
            onSuccess: () => {
                router.refresh();
                redirect("/")
            },
            onError: (ctx) => {
                if (ctx.error.code == "INVALID_EMAIL_OR_PASSWORD") {
                    setNotFound(true);
                }
                setLoading(false);
            }
        })
    }

    return (
        <div className="flex justify-center items-center w-full h-full px-10">
            <AuthForm 
                errors={errors}
                handleSubmit={handleSubmit}
                loading={loading}
                registration={false}
                notFound={notFound}
            />
        </div>
    )
}