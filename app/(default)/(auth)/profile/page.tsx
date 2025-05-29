import { getSession } from "@/api"
import { redirect } from "next/navigation"

export default async function ProfilePage() {

    const session = await getSession()

    if (!session?.user) {
        return redirect('/login')
    }

    return (
        <div>
            Hello, {session.user.name}!
        </div>
    )
}