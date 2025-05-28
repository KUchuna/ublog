"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const tabs = ["Most liked", "Most viewed", "Most commented"]

const test = [
  {
    id: 1,
    title: "Post 1",
    likes: 24,
    comments: 12,
    views: 81
  },
  {
    id: 2,
    title: "Post 2",
    likes: 42,
    comments: 4,
    views: 81
  },
  {
    id: 3,
    title: "Post 3",
    likes: 15,
    comments: 8,
    views: 102
  },
  {
    id: 4,
    title: "Post 4",
    likes: 58,
    comments: 22,
    views: 230
  },
  {
    id: 5,
    title: "Post 5",
    likes: 9,
    comments: 2,
    views: 45
  },
  {
    id: 6,
    title: "Post 6",
    likes: 33,
    comments: 14,
    views: 150
  },
  {
    id: 7,
    title: "Post 7",
    likes: 76,
    comments: 30,
    views: 300
  },
  {
    id: 8,
    title: "Post 8",
    likes: 5,
    comments: 1,
    views: 25
  },
  {
    id: 9,
    title: "Post 9",
    likes: 21,
    comments: 7,
    views: 95
  },
  {
    id: 10,
    title: "Post 10",
    likes: 60,
    comments: 19,
    views: 220
  }
];

interface Post {
  id: number;
  title: string;
  likes: number;
  comments: number;
  views: number;
}

export default function Featured() {
  const [activeTab, setActiveTab] = useState(tabs[0])
  
  const [posts, setPosts] = useState<Post[]>(test.slice().sort((a, b) => b.likes - a.likes))

  useEffect(() => {
      switch (activeTab) {
    case "Most liked":
      setPosts(test.slice().sort((a, b) => b.likes - a.likes));
      break;
    case "Most viewed":
      setPosts(test.slice().sort((a, b) => b.views - a.views))
      break;
    case "Most commented":
      setPosts(test.slice().sort((a, b) => b.comments - a.comments))
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
          {posts.map((post) => (
            <div key={post.title} className="flex flex-col border border-green-500">
              <p>title: {post.title}</p>
              <p>likes: {post.likes}</p>
              <p>comments: {post.comments}</p>
              <p>views: {post.views}</p>
            </div>
          ))}
      </section>
  )
}
