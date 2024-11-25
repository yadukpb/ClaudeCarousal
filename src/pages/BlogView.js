import React from 'react';
import { Search } from 'lucide-react';
import { useParams, Link } from 'react-router-dom'

const Navbar = () => (
  <nav className="bg-white shadow-sm py-4">
    <div className="container mx-auto px-4 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <div className="text-red-600 mr-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
          </svg>
        </div>
        <div>
          <span className="text-xl font-serif">Lowlead</span>
          <span className="text-xl font-serif text-gray-600">&nbsp;& Attorney</span>
        </div>
      </Link>
      
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
        <Link to="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <div className="relative h-96 bg-gray-800">
    <div className="absolute inset-0">
      <img
        src="/api/placeholder/1600/400"
        alt="Hero background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
    </div>
    <div className="relative container mx-auto px-4 h-full flex items-center">
      <div className="text-white">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">
          Domestic Violence in California – How a Lawyer Can Help.
        </h1>
        <div className="flex items-center text-sm">
          <a href="#" className="hover:underline">Home</a>
          <span className="mx-2">›</span>
          <span>Domestic Violence in California – How a Lawyer Can Help.</span>
        </div>
      </div>
    </div>
  </div>
);

const BlogContent = () => (
  <div className="py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-12">
        <main className="lg:w-2/3">
          <article>
            <img
              src="/api/placeholder/800/400"
              alt="Blog post image"
              className="w-full mb-8"
            />
            <div className="flex items-center mb-4">
              <span className="text-gray-600">by</span>
              <a href="#" className="text-red-600 mx-2">admin</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-gray-600 ml-2">Attorney</a>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-8">
                Sed nec sapien eu nibh porta fringilla. Aenean in lectus id tellus tempus rutrum vitae a elit. 
                Nulla sit amet interdum ligula. Duis bibendum porttitor tempus. Morbi nisi nisl, sagittis in enim at, 
                tempus convallis magna.
              </p>
              <div className="flex items-center mt-8 border-t pt-8">
                <img
                  src="/api/placeholder/60/60"
                  alt="Author"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-serif text-gray-900">Bentin Ali Benilmal</h3>
                  <p className="text-gray-600 mt-2">
                    Phasellus ac consequat turpis, sit amet fermentum nulla. Donec
                  </p>
                </div>
              </div>
            </div>
          </article>
        </main>

        <aside className="lg:w-1/3">
          <div className="bg-gray-50 p-6 mb-8">
            <h2 className="text-xl font-serif mb-4">Search</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-3 border border-gray-200 rounded"
              />
              <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          <div className="bg-gray-50 p-6 mb-8">
            <h2 className="text-xl font-serif mb-4">Category</h2>
            <ul>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600">Attorney</a>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6">
            <h2 className="text-xl font-serif mb-4">Recent Blogs</h2>
            <div className="space-y-4">
              <a href="#" className="flex items-start">
                <img
                  src="/api/placeholder/80/80"
                  alt="Recent post"
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium hover:text-red-600">
                    All you want to know about industrial laws
                  </h3>
                  <div className="text-sm text-gray-600 mt-1">
                    by <span className="text-red-600">admin</span> | Attorney
                  </div>
                </div>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
);

const Comments = () => (
  <div className="container mx-auto px-4 py-12">
    <h2 className="text-2xl font-serif mb-4">2 Comments</h2>
    <div className="space-y-8">
      <div className="flex">
        <img src="/api/placeholder/60/60" alt="Commenter" className="w-16 h-16 rounded-full mr-4"/>
        <div>
          <div className="flex items-center mb-2">
            <h3 className="font-medium">ThemesHadev</h3>
          </div>
          <p className="text-gray-600 mb-2">test</p>
          <button className="text-gray-500 hover:text-gray-700">Reply</button>
        </div>
      </div>

      <div className="flex">
        <img src="/api/placeholder/60/60" alt="Commenter" className="w-16 h-16 rounded-full mr-4"/>
        <div>
          <div className="flex items-center mb-2">
            <h3 className="font-medium">ThemesHadev</h3>
          </div>
          <p className="text-gray-600 mb-2">Call us 24/7 at 869-5414-5 or fill out the form below to receive a free and confidential initial consultation.</p>
          <button className="text-gray-500 hover:text-gray-700">Reply</button>
        </div>
      </div>
    </div>

    <div className="mt-12">
      <h2 className="text-2xl font-serif mb-4">Leave Comments</h2>
      <p className="text-gray-600 mb-6">Nunc velit metus, volutpat elementum euismod eget, cursus nec nunc.</p>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Your Full Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"/>
          <input type="email" placeholder="info.lawlead@gmail.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"/>
          <input type="tel" placeholder="+55 (121) 234 444" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"/>
          <input type="text" placeholder="Enter Your Address" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"/>
        </div>
        <textarea placeholder="Write your comment here..." rows="6" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"></textarea>
      </form>
    </div>
  </div>
);

const BlogView = () => {
  const { id } = useParams()
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <BlogContent />
      <Comments />
    </div>
  )
}

export default BlogView;