import { getBlogs } from "@/api";
import BlogCard from "@/components/Blog/BlogCard";
import "@/css/tiptap.css";
import { BlogPost } from "@/types";

export default async function Blog() {
  const blogs = await getBlogs();

  if (blogs.length == 0) {
    return (
      <div>
        No posts available
      </div>
    )
  }

  return (
    <div className="max-w-7xl w-full">
      <div className="flex flex-wrap justify-center w-full gap-5">
        {blogs.map((blog: BlogPost) => (
          <BlogCard 
            blog={blog}
            key={blog.id}
          />
        ))}
      </div>
    </div>
  );
}
