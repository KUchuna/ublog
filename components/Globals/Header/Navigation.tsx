"use client"

import { motion } from "motion/react";
import logo from "@/public/images/logo.png"
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
    return (
        <div className="flex">
            <Image src={logo} width={500} height={500} alt="Ublog" className="mr-6 w-full h-[40px]"/>
            <motion.span className="min-w-fit px-2 py-1 rounded-lg font-medium cursor-pointer flex justify-center items-center"
                whileHover={{backgroundColor: "#c879ff", scale: 1.1}}
                whileTap={{scale: 0.9}}
            >
                <Link href='/'>Home</Link>
            </motion.span>
            <motion.span className="min-w-fit px-2 py-1 rounded-lg font-medium cursor-pointer flex justify-center items-center"
                whileHover={{backgroundColor: "#c879ff", scale: 1.1}}
                whileTap={{scale: 0.9}}
            >
                <Link href='/'>Blog</Link>
            </motion.span>
            <motion.span className="min-w-fit px-2 py-1 rounded-lg font-medium cursor-pointer flex justify-center items-center"
                whileHover={{backgroundColor: "#c879ff", scale: 1.1}}
                whileTap={{scale: 0.9}}
            >
                <Link href='/'>Contact us</Link>
            </motion.span>
            <motion.span className="min-w-fit px-2 py-1 rounded-lg font-medium cursor-pointer flex justify-center items-center"
                whileHover={{backgroundColor: "#c879ff", scale: 1.1}}
                whileTap={{scale: 0.9}}
            >
                <Link href='/'>About</Link>
            </motion.span>
        </div>
    )
}