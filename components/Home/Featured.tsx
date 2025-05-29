"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const tabs = ["Most liked", "Most viewed", "Most commented"]

const test = [
  {}
];


export default function Featured() {
  const [activeTab, setActiveTab] = useState(tabs[0])
  
  //const [posts, setPosts] = useState()

  useEffect(() => {
      switch (activeTab) {
    case "Most liked":
      //setPosts(test.slice().sort((a, b) => b.likes - a.likes));
      break;
    case "Most viewed":
      //setPosts(test.slice().sort((a, b) => b.views - a.views))
      break;
    case "Most commented":
      //setPosts(test.slice().sort((a, b) => b.comments - a.comments))
      break;
  }
  }, [activeTab])


  return (
      <section className="w-full">
          <ul className="flex gap-4 relative w-fit border-b border-gray-300 select-none">
              {tabs.map((tab) => (
                  <li
                      key={tab}
                      className="relative px-2 py-1 cursor-pointer"
                      onClick={() => setActiveTab(tab)}
                  >
                      <span className={activeTab === tab ? "text-main" : "text-gray-500 opacity-50"}>
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
