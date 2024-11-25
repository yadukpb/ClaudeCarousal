import React, { useState } from 'react'

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    image: null,
    imagePreview: null
  })

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
    blogFormData.append('date', new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
    blogFormData.append('id', Date.now())
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gray-800 px-6 py-8">
          <h2 className="text-4xl font-extrabold text-white text-center tracking-tight">Create Legal Article</h2>
          <p className="mt-2 text-center text-gray-300 text-sm">Share your legal insights and expertise</p>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 py-10 space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              placeholder="Enter a compelling title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Article Summary</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-40"
              placeholder="Provide a brief summary of your article"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Your name and title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors">
              <div className="space-y-1 text-center">
                {!formData.imagePreview ? (
                  <>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input type="file" name="image" onChange={handleImageChange} className="sr-only" required />
                      </label>
                    </div>
                  </>
                ) : (
                  <img src={formData.imagePreview} alt="Preview" className="max-h-48 rounded-lg" />
                )}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}