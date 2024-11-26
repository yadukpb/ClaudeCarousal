import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "All You Want To Know About Industrial Laws",
      category: "Industrial Law",
      author: "Suyash Kumar",
      date: "March 15, 2024",
      excerpt: "Comprehensive guide to understanding industrial laws and their impact on businesses...",
      image: "https://static.wixstatic.com/media/6d22d1_e866b25b60e345cca8f82bcae150f331~mv2.jpg"
    },
    {
      id: 2,
      title: "What you must know about financial law changes",
      category: "Financial Law",
      author: "Ayush Singh",
      date: "March 10, 2024",
      excerpt: "Latest updates on financial regulations and their implications for businesses...",
      image: "https://cloudinary.hbs.edu/hbsit/image/upload/s--wx5D2ABw--/f_auto,c_fill,h_375,w_750,/v20200101/5393409F6FB391494111C5EC16653C89.jpg"
    },
    {
      id: 3,
      title: "How is auto insurance in case of an accident?",
      category: "Insurance Law",
      author: "Akash Patel",
      date: "March 5, 2024",
      excerpt: "Understanding your rights and coverage in auto insurance claims...",
      image: "https://cdnlearnblog.etmoney.com/wp-content/uploads/2022/09/Boost-Your-Car-Insurance.jpg"
    },
    {
      id: 4,
      title: "Education insurance for children's future",
      category: "Insurance Law",
      author: "Suyash Kumar",
      date: "February 28, 2024",
      excerpt: "Planning for your children's education through insurance policies...",
      image: "https://www.mcovergroup.co.ke/assets/image/gallery/female-graduate.jpg"
    }
  ];

  const recentPosts = blogPosts.slice(0, 3);
  const tags = ["Criminal Law", "Family Law", "Business Law", "Real Estate", "Insurance", "Civil Rights"];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          className="text-center mb-16"
        >
          <h2 className="font-cormorant text-[45px] leading-[53px] font-bold text-[#1A1A1A] mb-4">
            Legal Insights & Updates
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p className="font-cormorant text-2xl text-[#4A4A4A] max-w-3xl mx-auto">
            Stay informed with our latest legal perspectives and analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: index * 0.1}}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8E8]"
              >
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-[#4A4A4A] mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-amber-600"/>
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-amber-600"/>
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h3 className="font-cormorant text-2xl font-bold mb-4 text-[#1A1A1A] hover:text-amber-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#4A4A4A] mb-6">{post.excerpt}</p>
                  <button 
                    onClick={() => navigate(`/blog1`)}
                    className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Read More <ArrowRight size={16}/>
                  </button>
                </div>
              </motion.div>
            ))}

            <div className="flex justify-center items-center gap-3 mt-12">
              {[1, 2, 3].map(num => (
                <button 
                  key={num}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    num === 1 ? 'bg-amber-600 text-white' : 'border border-[#E8E8E8] text-[#4A4A4A] hover:bg-amber-50'
                  } transition-colors`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{opacity: 0, x: 20}}
              animate={{opacity: 1, x: 0}}
              className="bg-white p-6 rounded-xl shadow-lg border border-[#E8E8E8]"
            >
              <h3 className="font-cormorant text-xl font-bold mb-6 pb-2 border-b-2 border-amber-600">Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..." 
                  className="w-full p-4 border border-[#E8E8E8] rounded-lg pr-12 focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 cursor-pointer" size={20} />
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, x: 20}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: 0.1}}
              className="bg-white p-6 rounded-xl shadow-lg border border-[#E8E8E8]"
            >
              <h3 className="font-cormorant text-xl font-bold mb-6 pb-2 border-b-2 border-amber-600">Recent Posts</h3>
              <div className="space-y-6">
                {recentPosts.map(post => (
                  <div 
                    key={post.id} 
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                    />
                    <div>
                      <h4 className="font-medium group-hover:text-amber-600 transition-colors">{post.title}</h4>
                      <p className="text-sm text-[#4A4A4A] mt-2">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, x: 20}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: 0.2}}
              className="bg-white p-6 rounded-xl shadow-lg border border-[#E8E8E8]"
            >
              <h3 className="font-cormorant text-xl font-bold mb-6 pb-2 border-b-2 border-amber-600">Practice Areas</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-4 py-2 bg-slate-50 rounded-lg text-sm text-[#4A4A4A] hover:bg-amber-600 hover:text-white cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;