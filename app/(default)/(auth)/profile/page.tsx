import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"

export default async function ProfilePage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })



    return (
        <div className="flex flex-col">
            Hello, {session?.user.name}!
            <Link href="/newblog">Share your story</Link>
        </div>
    )
}