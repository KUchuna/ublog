import NewBlogEditor from "./NewBlogEditor";
import { createBlogAction } from "@/app/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewBlogForm() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user

    async function handleSubmit(formData: FormData) {
        "use server"
        const title = formData.get("title") as string
        const content = formData.get("content") as string
        const description = formData.get("description") as string
        const user_id = user?.id as string

        try {
            await createBlogAction({title: title, content: content, description: description, user_id: user_id})
        } catch (error) {
            console.log("error creating blog", error)
            return
        }
        redirect('/blog')
    }

    return (
        <div id="new-blog-form" className="">
            <NewBlogEditor 
                handleSubmit={handleSubmit}
            />
        </div>
    )
}