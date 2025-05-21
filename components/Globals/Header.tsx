"use client"

import Link from "next/link";
import { motion } from "motion/react";
import logo from "@/public/images/logo.png"
import Image from "next/image";

export default function Header() {
    return (
        <header className="sticky px-16 py-2 flex justify-center">
            <nav className="bg-main text-text rounded-xl flex py-3 px-4 items-center">
                <div className="flex">
                    <Image src={logo} width={50} height={50} alt="Ublog" className="rounded-full mr-6"/>
                    <motion.span className="px-2 py-1 rounded-lg font-medium cursor-pointer"
                        whileHover={{backgroundColor: "#c879ff", scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >
                        <Link href='/'>Home</Link>
                    </motion.span>
                    <motion.span className="px-2 py-1 rounded-lg font-medium cursor-pointer"
                        whileHover={{backgroundColor: "#c879ff", scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >
                        <Link href='/'>Blog</Link>
                    </motion.span>
                    <motion.span className="px-2 py-1 rounded-lg font-medium cursor-pointer"
                        whileHover={{backgroundColor: "#c879ff", scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >
                        <Link href='/'>About</Link>
                    </motion.span>
                </div>
            <div className="ml-20 flex gap-3 font-medium">
                <button>Log in</button>
                <button>Register</button>
            </div>
            </nav>
        </header>
    )
}