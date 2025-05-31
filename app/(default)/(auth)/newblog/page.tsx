import NewBlogForm from "@/components/NewBlog/NewBlogForm";

export default function NewBlog() {
    return (
        <section className="flex flex-col gap-4 max-w-7xl w-full">
            <h1 className="font-bold text-4xl font-dancing text-secondary">Write your story!</h1>
            <NewBlogForm />
        </section>
    )
}