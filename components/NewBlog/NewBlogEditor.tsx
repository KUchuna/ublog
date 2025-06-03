'use client'
import "@/css/tiptap.css"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from "next/image"
import { motion } from "motion/react"
import { useState } from "react"
import { z } from "zod";
import Loading from "../Globals/Loading"

const BlogSchema = z.object({
  title: z.string().refine(val => val.replace(/\s/g, '').length >= 10, {
    message: "Title must be at least 10 characters long"
  }),
  content: z.string().refine(val => val.replace(/\s/g, '').length >= 300, {
    message: "Content must be at least 300 characters long"
  }),
  description: z.string().refine(val => val.replace(/\s/g, '').length >= 150, {
    message: "Description must be at least 150 characters long"
  })
})

export default function NewBlogEditor({ handleSubmit}: {handleSubmit: (formData: FormData) => Promise<void>}) {

  const [blogTitle, setBlogTitle] = useState<string>("")
  const [blogBody, setBlogBody] = useState<string>("")
  const [blogDescription, setBlogDescription] = useState<string>("")

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

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
          class: 'code-block bg-red-500'
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
      },
      paragraph: {
        HTMLAttributes: {
          class: 'bg-blue-400'
        }
      }
    }), 
      Placeholder.configure({
        placeholder: 'Today was a fantastic day...',
      }),],
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: `tiptap-body border border-accent-100 ${errors.content && "border-red-rich"}`
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
        class: `tiptap-title bg-white outline-none px-[10px] py-[5px] rounded-lg font-bold text-2xl border border-accent-100 ${errors.title && "border-red-rich"}`,
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

  const variants = {
    hover: { rotate: -45}
  }

  const buttonVariants = {
    hover: { scale: 1.1}
  };


  async function handleValidation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)

    const result = BlogSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        description: formData.get('description'),
    })

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
          if (error.path.length > 0) {
              fieldErrors[error.path[0]] = error.message;
          }
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      setLoading(true)
      await handleSubmit(formData)
    } catch(error) {
      return
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="flex flex-col bg-white p-6 py-10 rounded-lg shadow-lg ">
      <p className="font-semibold text-black-rich">Post title</p>
      <EditorContent editor={title} />
      {errors.title && <p className="text-sm text-red-rich italic">{errors.title}</p>}
      <p className="font-semibold text-black-rich mt-5">Content</p>
      <div className="flex flex-col gap-3 bg-[#f4f6f9] rounded-t-lg px-[10px] py-[5px] border border-[#ccced1]" id="editor-options">
        <div className="flex gap-2 py-2">
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
      {errors.content && <p className="text-sm text-red-rich italic">{errors.content}</p>}
      <div className="mt-5 w-full flex flex-col">
        <p className="font-semibold text-black-rich">Short description</p>
        <textarea className={`w-full resize-none border rounded-lg outline-none px-[10px] py-[5px] text-sm ${errors.description ? "border-red-rich" : "border-accent-100"}`} placeholder="Short description of your story, which will be displayed on blogpost face..." value={blogDescription} onChange={(e) => setBlogDescription(e.target.value)}
        >

        </textarea>
        {errors.description && <p className="text-sm text-red-rich italic">{errors.description}</p>}
      </div>
      <form onSubmit={handleValidation} className="w-full flex mt-5">
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
        <input 
          type="text" 
          className="hidden"
          name="description"
          id="blog-description"
          value={blogDescription}
          readOnly
        />
        <motion.button 
          className={`bg-accent-300 px-6 py-3 rounded-lg ml-auto text-main font-bold shadow-md flex items-center gap-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={loading}
          whileHover="hover"
          whileTap={{ scale: 0.9}}
          variants={buttonVariants}
          transition={{ type: "spring", stiffness: 300, damping: 20}}
          >
          {loading ? <Loading /> : (
            <>
              Add post!
              <motion.img 
              src="/icons/tiptap/send.svg"
              alt="Post"
              width={18}
              height={18}
              variants={variants}
            />
            </>
          )}
        </motion.button>
      </form>
    </div>
  )
}
