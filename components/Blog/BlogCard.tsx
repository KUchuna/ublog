"use client"

import { BlogPost } from "@/types"
import {motion} from "motion/react"
import { useRouter } from "next/navigation";

export default function BlogCard({blog}: {blog: BlogPost}) {

    const router = useRouter()

    const formattedDate = new Date(blog.createdat).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const arrowVariants = {
        initial: { x: 0, opacity: 0.8 },
        hover: { x: 5, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    };

    const buttonVariants = {
        hover: {
            transition: {
            staggerChildren: 0.05,
            },
        },
    }


    return (
        <motion.div className="flex flex-col rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-75 w-[23%]"
            whileHover={{scale: 1.05,}}
        >
            <div className="px-5 py-3 flex flex-col gap-3 h-full">
                <h1 dangerouslySetInnerHTML={{ __html: blog.title.slice(0,40) }} className="font-bold text-xl text-black-rich break-words" />
                <p className="h-full break-words">
                    {blog.description.slice(0, 125)}...
                </p>
                <div className="flex gap-1 text-xs text-gray-400 mt-auto">
                    <p>By <span className="font-bold text-main hover:underline cursor-pointer">{blog.author}</span></p>
                    <span>&bull;</span>
                    <span>{formattedDate}</span>
                </div>
                <motion.button 
                    className="flex px-4 border border-main mr-auto gap-2 rounded-lg py-2 text-xs text-main font-bold cursor-pointer items-center"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    onClick={() => router.push(`/blog/${blog.id}`)}
                >
                    Read more 
                    <motion.img src="/icons/rightarrow.svg" alt="" width={18} height={18}
                        variants={arrowVariants}
                    />
                </motion.button>
            </div>
        </motion.div>
    )
}