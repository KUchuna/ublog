import Link from "next/link";
import Navigation from "./Navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signoutAction } from "@/app/actions";

export default async function Header() {

    const session = await auth.api.getSession({
    headers: await headers()
    })

    return (
        <header className="sticky px-16 py-2 flex justify-center">
            <nav className="bg-main text-text rounded-xl flex py-3 px-4 items-center">
                <Navigation />
                <div className="ml-20 flex gap-3 font-medium ">
                    {session?.user ?
                        <form action={signoutAction}><button className="cursor-pointer">Logo out</button></form>
                        :
                        <>
                            <Link href='login'>Log in</Link>
                            <Link href='register'>Register</Link>
                        </>
                    }
                </div>
            </nav>
        </header>
    )
}