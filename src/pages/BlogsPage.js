import React, { useState, useEffect, useCallback } from 'react';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../constants';
import ReactGA from 'react-ga4';
import { ErrorBoundary } from 'react-error-boundary';
import { debounce, throttle } from 'lodash';
import DOMPurify from 'dompurify';

const BlogPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTimer, setSearchTimer] = useState(null);
  const [error, setError] = useState(null);
  const [searchAttempts, setSearchAttempts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Blog Listing Page"
    });

    const startTime = Date.now();
    return () => {
      const timeSpent = Date.now() - startTime;
      ReactGA.event({
        category: "User Engagement",
        action: "Time Spent on Blog Page",
        value: Math.round(timeSpent / 1000)
      });
    };
  }, []);

  useEffect(() => {
    let scrollFlags = {
      quarter: false,
      half: false,
      threeQuarters: false,
      nearComplete: false
    };

    const handleScroll = throttle(() => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (!scrollFlags.quarter && scrollPercentage >= 25) {
        scrollFlags.quarter = true;
        ReactGA.event({
          category: "Scroll Depth",
          action: "Scrolled 25%"
        });
      }
      // Similar checks for other percentages
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('userData')
      if (userData) {
        const parsedData = JSON.parse(userData)
        setIsAdmin(parsedData.user?.role === 'admin')
        ReactGA.set({
          userRole: parsedData.user?.role,
          userId: parsedData.user?.id
        });
      }
    } catch (error) {
      setIsAdmin(false)
    }
  }, [])

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (searchAttempts > 10) {
        setError('Too many search attempts. Please wait.');
        return;
      }
      ReactGA.event({
        category: "Search",
        action: "Blog Search",
        label: value,
      });
    }, 2000),
    []
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleBlogClick = (post) => {
    ReactGA.event({
      category: "Blog Interaction",
      action: "Blog Click",
      label: post.title,
      value: 1,
      blog_id: post._id,
      blog_category: post.category,
      author: post.author?.name
    });
    navigate(`/blog/${post._id}`);
  };

  const handleTagClick = (tag) => {
    ReactGA.event({
      category: "Tag Interaction",
      action: "Tag Click",
      label: tag,
    });
  };

  const handleAddBlog = () => {
    ReactGA.event({
      category: "Admin Action",
      action: "Add Blog Initiated",
      label: "Add Blog Button Click"
    });
    navigate('/add-blog');
  };

  const handleRecentPostClick = (post) => {
    ReactGA.event({
      category: "Recent Posts",
      action: "Recent Post Click",
      label: post.title,
      value: 1,
      blog_id: post._id
    });
    navigate(`/blog/${post._id}`);
  };

  const handleImageLoad = (postId) => {
    ReactGA.event({
      category: "Performance",
      action: "Blog Image Loaded",
      label: postId
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    ReactGA.event({
      category: "Navigation",
      action: "Page Change",
      label: `Page ${pageNumber}`,
    });
  };

  useEffect(() => {
    setTotalPages(Math.ceil(blogs.length / ITEMS_PER_PAGE));
  }, [blogs]);

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    let isSubscribed = true;
    const fetchBlogsWithAnalytics = async () => {
      const startTime = Date.now();
      try {
        const response = await fetch(`${BACKEND_URL}/api/all-blogs`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
          }
        });
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        if (isSubscribed) {
          setBlogs(data);
          setLoading(false);
        }
        
        ReactGA.event({
          category: "Performance",
          action: "Blog Load Time",
          value: Date.now() - startTime,
          label: "Success"
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
        ReactGA.event({
          category: "Error",
          action: "Blog Fetch Failed",
          label: error.message
        });
      }
    };

    fetchBlogsWithAnalytics();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const recentPosts = blogs.slice(0, 3);
  const tags = ["Criminal Law", "Family Law", "Business Law", "Real Estate", "Insurance", "Civil Rights"];

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen pt-20 sm:pt-24 md:pt-28">
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              className="sticky top-20 sm:top-24 md:top-28 bg-gradient-to-b from-slate-50 to-slate-100 z-10 py-4"
            >
              <h2 className="font-cormorant text-3xl sm:text-4xl md:text-[45px] leading-tight sm:leading-[53px] font-bold text-[#1A1A1A] text-center">
                Legal Insights & Updates
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-amber-600 mx-auto mt-4"></div>
            </motion.div>

            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <p className="font-cormorant text-xl sm:text-2xl text-[#4A4A4A] max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
                Stay informed with our latest legal perspectives and analysis
              </p>
              {isAdmin && (
                <motion.button
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  onClick={handleAddBlog}
                  className="bg-amber-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 mx-auto text-sm sm:text-base"
                >
                  Add Blog <ArrowRight size={16}/>
                </motion.button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                {blogs.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.1}}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8E8] max-w-2xl mx-auto"
                    onClick={() => handleBlogClick(post)}
                  >
                    <img 
                      src={post.imageUrl}
                      alt={post.title}
                      onLoad={() => handleImageLoad(post._id)}
                      onError={(e) => {
                        e.target.src = '/fallback-image.jpg'
                        ReactGA.event({
                          category: "Error",
                          action: "Image Load Failed",
                          label: post._id
                        })
                      }}
                      className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#4A4A4A] mb-3">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <User size={14} className="text-amber-600"/>
                          <span>{DOMPurify.sanitize(post.author?.name) || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Calendar size={14} className="text-amber-600"/>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <h3 className="font-cormorant text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#1A1A1A] hover:text-amber-600 transition-colors">
                        {DOMPurify.sanitize(post.title)}
                      </h3>
                      <p className="text-sm text-[#4A4A4A] mb-4">{DOMPurify.sanitize(post.excerpt)}</p>
                      <button 
                        onClick={() => navigate(`/blog/${post._id}`)}
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
                      >
                        Read More <ArrowRight size={14}/>
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Pagination with added bottom margin and padding */}
                <div className="flex justify-center items-center gap-2 mt-8 mb-16 sm:mb-20 md:mb-24 pb-8 sm:pb-12 md:pb-16">
                  <button 
                    className="px-4 py-2 rounded-lg border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === index + 1
                          ? 'bg-amber-600 text-white'
                          : 'border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'
                      } transition-colors`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className="px-4 py-2 rounded-lg border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-4 sm:space-y-6 lg:space-y-8">
                <motion.div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-[#E8E8E8]">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search articles..." 
                    className="w-full p-3 sm:p-4 border border-[#E8E8E8] rounded-lg text-sm sm:text-base"
                  />
                </motion.div>

                <motion.div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-[#E8E8E8]">
                  <h3 className="font-cormorant text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#1A1A1A]">
                    Recent Blogs
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.map(post => (
                      <div 
                        key={post._id}
                        onClick={() => handleRecentPostClick(post)}
                        className="flex gap-3 sm:gap-4 group cursor-pointer"
                      >
                        <img 
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                        />
                        <div>
                          <h4 className="font-medium text-sm sm:text-base group-hover:text-amber-600 transition-colors">{post.title}</h4>
                          <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1 sm:mt-2">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1 sm:mt-2">
                            {DOMPurify.sanitize(post.author?.name) || 'Anonymous'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-[#E8E8E8] mb-16 sm:mb-20 md:mb-24">
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span 
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-50 rounded-lg text-xs sm:text-sm cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center p-4 text-sm sm:text-base mb-16 sm:mb-20 md:mb-24">
            {error}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default BlogPage;