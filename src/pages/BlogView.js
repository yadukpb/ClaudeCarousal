import React from 'react';
import { Search, Home } from 'lucide-react';
import { useParams, Link } from 'react-router-dom'

const Navbar = () => (
  <nav className="bg-white shadow-sm py-1">
    <div className="container mx-auto px-4 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <div className="text-red-600 mr-2">
          <Home className="w-8 h-8" />
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
  <div className="relative h-96">
    <div className="relative container mx-auto px-4 h-full flex items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900">
          All You Want To Know About Industrial Laws
        </h1>
        <div className="flex items-center text-sm">
          <Link to="/" className="text-gray-600 hover:underline">Home</Link>
          <span className="mx-2 text-gray-600">›</span>
          <span className="text-gray-600">Industrial Law</span>
        </div>
      </div>
    </div>
  </div>
);

const BlogContent = () => (
  <div className="py-4">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="lg:w-2/3">
          <article>
            <img
              src="https://static.wixstatic.com/media/6d22d1_e866b25b60e345cca8f82bcae150f331~mv2.jpg"
              alt="Industrial Laws"
              className="w-full mb-4 rounded-xl"
            />
            <div className="flex items-center mb-3">
              <span className="text-gray-600">by</span>
              <span className="text-red-600 mx-2">Suyash</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 ml-2">March 15, 2024</span>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                Industrial law, also known as labor law or employment law, plays a crucial role in governing the relationship between employers, employees, and labor unions. This comprehensive guide explores the key aspects of industrial laws and their impact on modern businesses.
              </p>
              
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Key Components of Industrial Law</h2>
              
              <p className="text-gray-600 mb-4">
                Industrial law encompasses various aspects including workplace safety regulations, minimum wage requirements, working hours, overtime compensation, and employee benefits. Understanding these components is essential for both employers and employees to maintain a harmonious work environment.
              </p>

              <h2 className="text-2xl font-serif text-gray-900 mb-4">Rights and Responsibilities</h2>
              
              <p className="text-gray-600 mb-4">
                Employers must ensure compliance with workplace safety standards, fair compensation practices, and anti-discrimination policies. Employees, on the other hand, have rights to safe working conditions, fair wages, and protection against workplace discrimination and harassment.
              </p>

              <h2 className="text-2xl font-serif text-gray-900 mb-4">Dispute Resolution</h2>
              
              <p className="text-gray-600 mb-4">
                Industrial laws provide frameworks for resolving workplace disputes through various mechanisms including mediation, arbitration, and legal proceedings. Understanding these processes helps both parties address conflicts effectively while maintaining professional relationships.
              </p>

              <div className="flex items-center mt-8 border-t pt-8">
                <img
                  src=""
                  alt="Author"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-serif text-gray-900">Suyash</h3>
                  <p className="text-gray-600 mt-2">
                    Law Student at NLSIU, Bangalore
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
    <h2 className="text-2xl font-serif mb-4">3 Comments</h2>
    <div className="space-y-8">
      <div className="flex">
        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Commenter" className="w-16 h-16 rounded-full mr-4"/>
        <div>
          <div className="flex items-center mb-2">
            <h3 className="font-medium">Rajesh Sharma</h3>
            <span className="text-gray-400 text-sm ml-2">2 days ago</span>
          </div>
          <p className="text-gray-600 mb-2">Very informative article on industrial laws. As an HR manager in Delhi, I find these insights particularly helpful for our manufacturing unit. Would love to see more content on employee welfare regulations.</p>
          <button className="text-gray-500 hover:text-gray-700">Reply</button>
        </div>
      </div>

      <div className="flex">
        <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="Commenter" className="w-16 h-16 rounded-full mr-4"/>
        <div>
          <div className="flex items-center mb-2">
            <h3 className="font-medium">Priya Patel</h3>
            <span className="text-gray-400 text-sm ml-2">1 day ago</span>
          </div>
          <p className="text-gray-600 mb-2">I recently dealt with a workplace dispute in my company in Mumbai. The section about dispute resolution mechanisms was extremely helpful. Could you please elaborate more on the recent amendments to the Industrial Relations Code?</p>
          <button className="text-gray-500 hover:text-gray-700">Reply</button>
        </div>
      </div>

      <div className="flex">
        <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Commenter" className="w-16 h-16 rounded-full mr-4"/>
        <div>
          <div className="flex items-center mb-2">
            <h3 className="font-medium">Amit Verma</h3>
            <span className="text-gray-400 text-sm ml-2">5 hours ago</span>
          </div>
          <p className="text-gray-600 mb-2">As a small business owner from Bangalore, understanding these laws is crucial. The article provides good insights, but I would appreciate if you could cover compliance requirements for startups specifically.</p>
          <button className="text-gray-500 hover:text-gray-700">Reply</button>
        </div>
      </div>
    </div>

    <div className="mt-12">
      <h2 className="text-2xl font-serif mb-4">Leave a Comment</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"/>
          <input type="email" placeholder="Email Address" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"/>
          <input type="tel" placeholder="Mobile Number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"/>
          <input type="text" placeholder="City" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"/>
        </div>
        <textarea placeholder="Share your thoughts or questions..." rows="6" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"></textarea>
        <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700">Submit Comment</button>
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