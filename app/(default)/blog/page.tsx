import { getBlogs } from "@/api";
import "@/css/tiptap.css";

export default async function Blog() {
  const blogs = await getBlogs();

  return (
    <div className="flex gap-4">
      {blogs.map((blog: {title: string, body: string, id: string}) => (
        <div key={blog.id}>
          <h1 dangerouslySetInnerHTML={{ __html: blog.title }} />
          <div dangerouslySetInnerHTML={{ __html: blog.body }} />
        </div>
      ))}
    </div>
  );
}
