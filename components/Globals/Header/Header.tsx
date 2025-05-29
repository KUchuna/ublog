import Link from "next/link";
import Navigation from "./Navigation";
import { getSession } from "@/api";
import ProfileButton from "./ProfileButton";

export default async function Header() {

    const session = await getSession()

    return (
        <header className="sticky px-16 py-2 flex justify-center top-0 z-50 select-none">
            <nav className="bg-main text-text rounded-xl flex py-3 px-4 items-center">
                <Navigation />
                <div className="ml-20 flex gap-3 font-medium ">
                    {session?.user ?
                    (
                        <ProfileButton />
                    )
                        :
                        <>
                            <Link href='login' className="border border-white rounded-3xl px-3 py-1 hover:bg-white hover:text-main duration-200">Log in</Link>
                            <Link href='register' className="border border-main text-main rounded-3xl px-3 py-1 bg-white hover:bg-main hover:text-white hover:border-white duration-200">Register</Link>
                        </>
                    }
                </div>
            </nav>
        </header>
    )
}