"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LogoutForm from "./LogoutForm";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

export default function ProfileButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)

        const handleClickOutside = (e: MouseEvent) => {

            const button = document.getElementById("profile-button");
            if (button && !button.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    })

    if (!mounted) {
        return (
            <div id="profile-button" className="relative">
            <Image
                src={"/icons/profile.svg"}
                alt="Profile"
                width={30}
                height={30}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-100"
            />
            </div>
        );
    }

    return (
        <div id="profile-button" className="relative">
            <Image
                src={"/icons/profile.svg"}
                alt="Profile"
                width={30}
                height={30}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-100"
                onClick={() => setIsOpen(!isOpen)}
            />

            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="bg-white z-[100] absolute translate-y-[100%] flex flex-col -bottom-[17px] -right-4 w-fit rounded-lg border border-main text-main overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                        >   
                            <Link href="/profile" className="py-2 px-4 hover:bg-platinum" onClick={() => setIsOpen(false)}>Profile</Link>
                            <LogoutForm />
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.getElementById("profile-button") || document.body
            )}
        </div>
    );
}
