import { getSingleBlog } from "@/api"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

    const id = (await params).id
    const blog = await getSingleBlog(id)

    if (!blog) return



    return (
        <div className="flex">
          <h1 dangerouslySetInnerHTML={{ __html: blog.title }} className="font-bold text-xl text-black-rich break-words" />
          <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
        </div>
    )
  
}