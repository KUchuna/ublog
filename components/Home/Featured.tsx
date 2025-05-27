"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const tabs = ["Most liked", "Most viewed", "Most commented"]

export default function Featured() {
    const [activeTab, setActiveTab] = useState(tabs[0])

    return (
        <section className="w-full">
            <ul className="flex gap-4 relative w-fit border-b border-gray-300 select-none">
                {tabs.map((tab) => (
                    <li
                        key={tab}
                        className="relative px-2 py-1 cursor-pointer"
                        onClick={() => setActiveTab(tab)}
                    >
                        <span className={activeTab === tab ? "text-main" : "text-gray-500"}>
                            {tab}
                        </span>
                        {activeTab === tab && (
                            <motion.div
                                layoutId="underline"
                                className="absolute left-0 right-0 h-[2px] bg-main bottom-[-2px]"
                                transition={{ type: "tween", duration: 0.3 }}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
