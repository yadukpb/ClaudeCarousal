import React from 'react'

export default function BlogCard({ title, excerpt, date, author, image }) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="flex justify-between items-start mb-16">
          <div className="flex-1">
            <h1 className="font-['Hepta_Slab'] text-[116px] leading-[116px] text-[#343842] font-[500]">
              Latest<br />
              Blogs
            </h1>
          </div>
        </div>
        <h2 className="font-['Jost'] text-[32px] leading-[32px] text-[#343842] font-normal mb-6">Insights from Legal Experts</h2>
        <p className="text-gray-600 text-lg mb-20 max-w-3xl">
          Stay informed with our latest legal insights, industry updates, and expert analysis from our experienced team .
        </p>
      </div>
      <div className="blog-card">
        <div className="blog-card-inner">
          <div className="blog-image-wrapper">
            <img src={image} alt={title} className="blog-image"/>
            <div className="blog-overlay"></div>
          </div>
          <div className="blog-content">
            <div className="blog-meta">
              <span className="blog-date">{date}</span>
              <span className="blog-author">{author}</span>
            </div>
            <h2 className="blog-title">{title}</h2>
            <p className="blog-excerpt">{excerpt}</p>
            <div className="blog-footer">
              <button className="read-more">Read Article</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}