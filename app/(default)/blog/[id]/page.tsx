import { getSingleBlog } from "@/api"
import "@/css/tiptap.css"
import Link from "next/link"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

    const id = (await params).id
    const blog = await getSingleBlog(id)

    if (!blog) return (
      <div className="flex flex-col">
        Error occured :(
          <Link href="/" className="underline">Return home</Link>
      </div>
    )



    return (
        <div className="flex flex-col max-w-[200px]">
          <h1 dangerouslySetInnerHTML={{ __html: blog.title }} className="font-bold text-xl text-black-rich break-words" />
          <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
        </div>
    )
  
}