import React from 'react';
import { Search } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "All You Want To Know About Industrial Laws",
      category: "Attorney",
      author: "admin",
      image: "https://lowleadwp.themesflat.co/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit/"
    },
    {
      id: 2,
      title: "What you must know about financial law changes",
      category: "Attorney",
      author: "admin",
      image: "https://lowleadwp.themesflat.co/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit/"
    },
    {
      id: 3,
      title: "How is auto insurance in case of an accident?",
      category: "Attorney",
      author: "admin",
      image: "https://lowleadwp.themesflat.co/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit/"
    },
    {
      id: 4,
      title: "Education insurance for children's future",
      category: "Attorney",
      author: "admin",
      image: "https://lowleadwp.themesflat.co/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit/"
    }
  ];

  const recentPosts = [...blogPosts].slice(0, 4);
  const tags = ["Agency", "Business", "Creative", "Law", "Attorney"];

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation would go here */}
      
      {/* Hero Banner */}
      <div className="relative h-64 bg-gray-900">
        <img 
          src="/api/placeholder/1920/400" 
          alt="Blog banner" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-serif mb-4">Blog</h1>
          <div className="flex items-center gap-2">
            <span>Home</span>
            <span>›</span>
            <span>Blog</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Blog Posts */}
          <div className="lg:col-span-2">
            {blogPosts.map(post => (
              <div key={post.id} className="mb-12">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover mb-4"
                />
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>by {post.author}</span>
                  <span>•</span>
                  <span>{post.category}</span>
                </div>
                <h2 className="text-2xl font-serif mb-4">{post.title}</h2>
                <button className="bg-gray-900 text-white px-6 py-2 hover:bg-gray-800 transition-colors">
                  Discover More
                </button>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-12">
              <h3 className="text-xl font-serif mb-4 pb-2 border-b border-red-500">Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full p-3 border border-gray-300 pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Category */}
            <div className="mb-12">
              <h3 className="text-xl font-serif mb-4 pb-2 border-b border-red-500">Category</h3>
              <ul>
                <li className="py-2">
                  <a href="#" className="text-gray-700 hover:text-red-500">Attorney</a>
                </li>
              </ul>
            </div>

            {/* Recent Blogs */}
            <div className="mb-12">
              <h3 className="text-xl font-serif mb-4 pb-2 border-b border-red-500">Recent Blogs</h3>
              {recentPosts.map(post => (
                <div key={post.id} className="flex gap-4 mb-4">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium mb-1">{post.title}</h4>
                    <div className="text-xs text-gray-600">
                      <span>by {post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-xl font-serif mb-4 pb-2 border-b border-red-500">Tags Here</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <a 
                    key={tag}
                    href="#" 
                    className="px-3 py-1 bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
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