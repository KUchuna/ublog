'use client'
import "@/css/tiptap.css"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from "next/image"
import { motion } from "motion/react"
import { useState } from "react"


export default function Tiptap({ handleSubmit}: {handleSubmit: (formData: FormData) => Promise<void>}) {

  const [blogTitle, setBlogTitle] = useState<string>("")
  const [blogBody, setBlogBody] = useState<string>("")

  const editor = useEditor({
    onUpdate({ editor }) {
      setBlogBody(editor.getHTML())
    },
    extensions: [StarterKit.configure({
      blockquote: {
        HTMLAttributes: {
          class: 'blockquote',
        },
      },
      bulletList:{
        HTMLAttributes: {
          class: 'bullet-list',
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: 'ordered-list'
        }
      },
      codeBlock: {
        HTMLAttributes: {
          class: 'code-block'
        }
      },
      heading: {
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: 'heading'
        }
      },
      bold: {
        HTMLAttributes: {
          class: 'bold'
        }
      },
      horizontalRule: {
        HTMLAttributes: {
          class: 'horizontal-rule'
        }
      }
    }), 
      Placeholder.configure({
        placeholder: 'Today was a fantastic day...',
      }),],
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: 'tiptap-body shadow-lg'
        },
        handlePaste(view, event) {
          event.preventDefault()
          const text = event.clipboardData?.getData('text/plain')
          if (text) {
            view.dispatch(
              view.state.tr.insertText(text, view.state.selection.from, view.state.selection.to)
            )
          }
          return true
        }
      },
      
  })
  
  const title = useEditor({
    onUpdate({ editor }) {
      setBlogTitle(editor.getHTML())
    },
    extensions: [
      StarterKit.configure({
        bold: false
      }),
      Placeholder.configure({
        placeholder: 'My Awesome Blog Post Title',
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap-title bg-white outline-none px-[10px] py-[5px] rounded-lg mb-5 font-bold text-2xl border border-accent-100',
      },
      handlePaste(view, event) {
          event.preventDefault()
          const text = event.clipboardData?.getData('text/plain')
          if (text) {
            view.dispatch(
              view.state.tr.insertText(text, view.state.selection.from, view.state.selection.to)
            )
          }
          return true
        }
    },
  });


  if (!editor) {
      return null
  }
  if (!title) {
    return null
  }

  return (
    <div className="flex flex-col">
      <p className="italic">Post title</p>
      <EditorContent editor={title} />
      <p className="italic">Post body</p>
      <div className="flex flex-col gap-3 bg-[#f4f6f9] rounded-t-lg px-[10px] py-[5px] border border-[#ccced1]" id="editor-options">
        <div className="flex gap-2">
          <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            <Image 
            src="/icons/tiptap/quoteon.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />
          </button>
          <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <Image 
            src="/icons/tiptap/bullet.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />
          </button>
          <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            <Image 
            src="/icons/tiptap/orderedlist.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />
          </button>
          <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            <Image 
            src="/icons/tiptap/code.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />
          </button>
          <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            <Image 
            src="/icons/tiptap/h1.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />
          </button>
          <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            <Image 
            src="/icons/tiptap/h2.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />
          </button>
          <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            <Image 
            src="/icons/tiptap/h3.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />
          </button>
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <Image 
            src="/icons/tiptap/hr.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />
          </button>
          <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive('bold') ? 'is-active' : ''} italic font-bold font-serif`}
          >
            <Image 
            src="/icons/tiptap/bold.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />
          </button>
          <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive('italic') ? 'is-active' : ''} italic font-bold font-serif`}
          >
            <Image 
            src="/icons/tiptap/italic.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />
          </button>
          <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${editor.isActive('strike') ? 'is-active' : ''} font-bold font-serif line-through`}
          >
            <Image 
            src="/icons/tiptap/strike.svg"
            alt="Blockquote"
            width={18}
            height={18}
            />       
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
      <form action={handleSubmit} className="w-full flex mt-5">
        <input 
          type="text" 
          className="hidden"
          name="title"
          id="blog-title"
          value={blogTitle}
          readOnly
        />
        <input 
          type="text" 
          className="hidden"
          name="content"
          id="blog-content"
          value={blogBody}
          readOnly
        />
        <motion.button 
          className="bg-accent-300 px-3 py-1 rounded-lg ml-auto text-main font-bold cursor-pointer shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9}}
          transition={{ type: "spring", stiffness: 300, damping: 20}}
          >
          Add post!
        </motion.button>
      </form>
    </div>
  )
}
