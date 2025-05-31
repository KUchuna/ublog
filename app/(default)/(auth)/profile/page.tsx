import { getSession } from "@/api"
import Link from "next/link"

export default async function ProfilePage() {

    const session = await getSession()



    return (
        <div className="flex flex-col">
            Hello, {session?.user.name}!
            <Link href="/newblog">Share your story</Link>
        </div>
    )
}