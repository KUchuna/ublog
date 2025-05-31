import { getSession } from "@/api";
import Tiptap from "./TipTap";
import { createBlogAction } from "@/app/actions";

export default async function NewBlogForm() {

    const session = await getSession()

    const user = session?.user

    async function handleSubmit(formData: FormData) {
        "use server"
        const title = formData.get("title") as string
        const content = formData.get("content") as string
        const user_id = user?.id as string

        try {
            await createBlogAction({title: title, content: content, user_id: user_id})
        } catch (error) {
            console.log("error creating blog", error)
        }
    }

    return (
        <div id="new-blog-form" className="">
            <Tiptap 
                handleSubmit={handleSubmit}
            />
        </div>
    )
}