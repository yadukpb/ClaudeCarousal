import React from 'react';
import { Search } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "All You Want To Know About Industrial Laws",
      category: "Attorney",
      author: "admin",
      image: "https://static.wixstatic.com/media/6d22d1_e866b25b60e345cca8f82bcae150f331~mv2.jpg/v1/fill/w_740,h_444,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6d22d1_e866b25b60e345cca8f82bcae150f331~mv2.jpg"
    },
    {
      id: 2,
      title: "What you must know about financial law changes",
      category: "Attorney",
      author: "admin",
      image: "https://cloudinary.hbs.edu/hbsit/image/upload/s--wx5D2ABw--/f_auto,c_fill,h_375,w_750,/v20200101/5393409F6FB391494111C5EC16653C89.jpg"
    },
    {
      id: 3,
      title: "How is auto insurance in case of an accident?",
      category: "Attorney",
      author: "admin",
      image: "https://cdnlearnblog.etmoney.com/wp-content/uploads/2022/09/Boost-Your-Car-Insurance.jpg"
    },
    {
      id: 4,
      title: "Education insurance for children's future",
      category: "Attorney",
      author: "admin",
      image: "https://www.mcovergroup.co.ke/assets/image/gallery/female-graduate.jpg"
    }
  ];

  const recentPosts = [...blogPosts].slice(0, 4);
  const tags = ["Agency", "Business", "Creative", "Law", "Attorney"];

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-24">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-gray-600 mb-3 text-sm md:text-base">
            <span>Home</span>
            <span>›</span>
            <span>Blog</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif">Blogs</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            {blogPosts.map(post => (
              <div key={post.id} className="mb-8 md:mb-12">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 md:h-64 object-cover mb-4"
                />
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mb-2">
                  <span>by {post.author}</span>
                  <span>•</span>
                  <span>{post.category}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-serif mb-4">{post.title}</h2>
                <button className="w-full md:w-auto bg-gray-900 text-white px-4 md:px-6 py-2 hover:bg-gray-800 transition-colors">
                  Discover More
                </button>
              </div>
            ))}

            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
                ←
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded bg-gray-900 text-white">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
                →
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="mb-8 md:mb-12">
              <h3 className="text-lg md:text-xl font-serif mb-4 pb-2 border-b border-red-500">Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full p-2 md:p-3 border border-gray-300 pr-10 text-sm md:text-base"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="mb-8 md:mb-12">
              <h3 className="text-lg md:text-xl font-serif mb-4 pb-2 border-b border-red-500">Recent Blogs</h3>
              {recentPosts.map(post => (
                <div key={post.id} className="flex gap-3 md:gap-4 mb-4">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-14 h-14 md:w-16 md:h-16 object-cover"
                  />
                  <div>
                    <h4 className="text-xs md:text-sm font-medium mb-1">{post.title}</h4>
                    <div className="text-xs text-gray-600">
                      <span>by {post.author}</span>
                      <span className="mx-1 md:mx-2">•</span>
                      <span>{post.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8 md:mb-12">
              <h3 className="text-lg md:text-xl font-serif mb-4 pb-2 border-b border-red-500">Tags Here</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <a 
                    key={tag}
                    href="#" 
                    className="px-2 md:px-3 py-1 bg-gray-100 text-xs md:text-sm text-gray-700 hover:bg-gray-200"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;