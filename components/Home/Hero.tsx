"use client"

import { User } from "@/types";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Hero({user}: {user: User | null}) {
    
    const router = useRouter()

    return (
        <section className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex select-none">
            <div className="w-[60%] h-[520px] relative">
                <Image src={'/images/hero.png'} alt="" fill className="object-cover object-bottom-right z-0 "/>
                <motion.div 
                    className="z-10 border border-white absolute top-1/2 -translate-y-1/2 left-20 max-w-[40%] text-white bg-accent-400 shadow-2xl px-3 py-4 rounded-xl"
                    whileHover={{scale: 1.1}}
                    transition= {{
                        duration: 0.3,
                        type: "tween"
                    }}

                >
                    <h1 className="text-3xl font-bold mb-1 cursor-default text-center">
                        {user ? `Welcome back, ${user.name}!` : "Welcome to UBlog"}
                    </h1>
                    <p className="text-xs cursor-default  italic">
                        Your space to write, share, and inspire.
                        Join a community of thinkers, storytellers, and creators. Start your own blog, discover fresh perspectives, and make your voice heard.
                    </p>
                </motion.div>
                <div className="z-10 absolute bottom-15 left-20 flex justify-between w-[40%]">
                    <motion.button 
                        className="px-4 py-2 bg-main border border-main shadow-xl cursor-pointer rounded-lg text-white"
                        whileHover={{translateY: -5}}
                        onClick={() => router.push('/about')}
                    >
                        Learn more
                    </motion.button>
                    <motion.button 
                        className="px-4 py-2 bg-white border border-white shadow-xl cursor-pointer rounded-lg text-main"
                        whileHover={{translateY: -5}}
                        onClick={() => router.push('/blog')}
                    >
                        Read posts
                    </motion.button>
                </div>
            </div>
            <div className="w-[40%] flex flex-col justify-center items-center px-10 font-dancing">
                <motion.p 
                    className="text-xl italic text-main"
                    animate={{y: [0, 10, 0]}}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                   "Every story begins with a voice — yours.
                    Share your journey, your passion, your world.
                    UBlog is the canvas. Start blogging today."
                </motion.p>
                <p className="ml-auto italic font-bold">- ChatGPT</p>
            </div>
        </section>
    )
}