"use client"

import { motion } from "motion/react";
import logo from "@/public/images/logo.png"
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
    return (
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
    )
}