import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X } from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    image: null,
    imagePreview: null,
    content: '',
    category: ''
  })

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'align',
    'link',
    'image'
  ]

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const blogFormData = new FormData()
    blogFormData.append('title', formData.title)
    blogFormData.append('excerpt', formData.excerpt)
    blogFormData.append('author', formData.author)
    blogFormData.append('image', formData.image)
    blogFormData.append('content', formData.content)
    blogFormData.append('category', formData.category)
    blogFormData.append('date', new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
    blogFormData.append('id', Date.now())
  }

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
      imagePreview: null
    })
  }

  const handleContentChange = (content) => {
    setFormData({...formData, content: content})
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          className="text-center mb-12"
        >
          <h2 className="font-cormorant text-[45px] leading-[53px] font-bold text-[#1A1A1A] mb-4">
            Create Legal Article
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p className="font-cormorant text-2xl text-[#4A4A4A]">
            Share your legal insights and expertise with our community
          </p>
        </motion.div>

        <motion.div 
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="bg-white rounded-xl shadow-xl overflow-hidden border border-[#E8E8E8]"
        >
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-[#1A1A1A] font-semibold mb-2">Article Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-[#E8E8E8] focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Enter a compelling title"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-[#E8E8E8] focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Your name and title"
                  required
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-[#E8E8E8] focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Corporate Law">Corporate Law</option>
                  <option value="Criminal Law">Criminal Law</option>
                  <option value="Family Law">Family Law</option>
                  <option value="Property Law">Property Law</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A1A] font-semibold mb-2">Article Summary</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-[#E8E8E8] focus:ring-2 focus:ring-amber-600 focus:border-transparent h-32"
                placeholder="Provide a brief summary of your article"
                required
              />
            </div>

            <div>
              <label className="block text-[#1A1A1A] font-semibold mb-2">Article Content</label>
              <div className="border rounded-lg overflow-hidden">
                <ReactQuill
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={modules}
                  formats={formats}
                  className="h-96"
                  theme="snow"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A1A] font-semibold mb-2">Featured Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-[#E8E8E8] rounded-lg hover:border-amber-600 transition-colors">
                <div className="space-y-1 text-center">
                  {!formData.imagePreview ? (
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500">
                          <span>Upload a file</span>
                          <input type="file" onChange={handleImageChange} className="sr-only" accept="image/*" required />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img src={formData.imagePreview} alt="Preview" className="max-h-48 rounded-lg" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
              >
                Publish Article
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}