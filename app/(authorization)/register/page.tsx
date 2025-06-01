"use client"

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { z } from "zod";
import AuthForm from "@/components/Auth/AuthForm";

const RegisterSchema = z.object({
    name: z.string().refine(val => val.replace(/\s/g, '').length >= 5, {
    message: "Name must be at least 5 characters long"
    }),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().refine(val => val.replace(/\s/g, '').length >= 8, {
    message: "Name must be at least 8 non-whitespace characters long"
    })
})

export default function Register() {

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<{[key: string]: string}>({})

    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const result = RegisterSchema.safeParse({
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

        const _ = await authClient.signUp.email({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            name: formData.get('name') as string,
            callbackURL: "/"
        },{
            onRequest: () => {
                setLoading(true)
                setErrors({});
            },
            onSuccess: () => {
                router.refresh();
                redirect("/")
            },
            onError: (ctx) => {
                alert(ctx.error?.message);
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
                registration
            />
        </div>
    )
}