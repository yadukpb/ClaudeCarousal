import React, { useState, useEffect } from 'react';
import { Search, Home } from 'lucide-react';
import { useParams, Link } from 'react-router-dom'
import { BACKEND_URL } from '../constants'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CryptoJS from 'crypto-js';

const Navbar = () => (
  <nav className="bg-white shadow-sm py-0">
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

const HeroSection = ({ blog }) => (
  <div className="relative h-96 mt-0">
    <div className="relative container mx-auto px-4 h-full flex items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900">
          {blog.title}
        </h1>
        <div className="flex items-center text-sm mb-2">
          <Link to="/" className="text-gray-600 hover:underline">Home</Link>
          <span className="mx-2 text-gray-600">›</span>
          <span className="text-gray-600">{blog?.category}</span>
        </div>
      </div>
    </div>
  </div>
);

const BlogContent = ({ blog, isAdmin, onEdit, onSave, handleDelete }) => (
  <div className="py-4">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="lg:w-2/3 relative flex-grow">
          <article>
            <img
              src={blog.imageUrl}
              alt="Industrial Laws"
              className="w-full mb-2 rounded-xl"
            />
            <div className="flex items-center mb-3">
              <span className="text-gray-600">by</span>
              <span className="text-red-600 mx-2">{blog.author.name}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 ml-2">{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            {isAdmin ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={blog.title}
                  onChange={(e) => onEdit('title', e.target.value)}
                  className="text-4xl font-serif mb-4 text-gray-900 flex-grow"
                />
                <IconButton onClick={onSave} className="ml-2">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleDelete} className="ml-2">
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : (
              <h1 className="text-4xl font-serif mb-4 text-gray-900">{blog.title}</h1>
            )}
            {isAdmin ? (
              <textarea
                value={blog.content}
                onChange={(e) => onEdit('content', e.target.value)}
                className="text-gray-600 mb-4 w-full h-[500px] resize-none p-3 border border-gray-200 rounded"
                placeholder="Write your blog content here..."
              />
            ) : (
              <div className="text-gray-600 mb-4">{blog.content}</div>
            )}
            {isAdmin && (
              <IconButton onClick={onSave} className="mt-4">
                <EditIcon />
              </IconButton>
            )}
          </article>
        </main>

        <aside className="lg:w-1/3 flex-shrink-0">
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
                <a href="#" className="text-gray-600 hover:text-red-600">{blog?.category}</a>
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


const Comments = ({ comments, handleCommentSubmit }) => {
  const [commentData, setCommentData] = useState({ name: '', email: '', content: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommentSubmit(commentData);
    setCommentData({ name: '', email: '', content: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-serif mb-4">{comments.length} Comments</h2>
      <div className="space-y-8">
        {comments.map((comment, index) => (
          <div className="flex" key={index}>
            <img src="https://via.placeholder.com/75" alt="Commenter" className="w-16 h-16 rounded-full mr-4"/>
            <div>
              <div className="flex items-center mb-2">
                <h3 className="font-medium">{comment.user.name}</h3>
                <span className="text-gray-400 text-sm ml-2">{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-600 mb-2">{comment.content}</p>
              <button className="text-gray-500 hover:text-gray-700">Reply</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-serif mb-4">Leave a Comment</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <input type="text" name="name" value={commentData.name} onChange={handleInputChange} placeholder="Full Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"/>
            <input type="email" name="email" value={commentData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"/>
          </div>
          <textarea name="content" value={commentData.content} onChange={handleInputChange} placeholder="Share your thoughts..." rows="6" className="w-full p-3 bg-gray-50 border border-gray-200 rounded"></textarea>
          <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700">Submit Comment</button>
        </form>
      </div>
    </div>
  );
};

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
        } else {
          throw new Error('Blog not found');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    const checkAdminStatus = () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData).user;
        setIsAdmin(user.role === 'admin');
      }
    };
    checkAdminStatus();
  }, [id]);

  const handleEdit = (field, value) => {
    setBlog((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const encryptedTokens = localStorage.getItem('tokens');
      const key = process.env.REACT_APP_ENCRYPTION_KEY;
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedTokens, key);
      const { accessToken } = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

      const response = await fetch(`${BACKEND_URL}/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: blog.title,
          content: blog.content,
        }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlog(updatedBlog);
      } else {
        const errorData = await response.json();
        console.error('Error saving blog:', errorData);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const encryptedTokens = localStorage.getItem('tokens');
      const key = process.env.REACT_APP_ENCRYPTION_KEY;
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedTokens, key);
      const { accessToken } = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

      const response = await fetch(`${BACKEND_URL}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setBlog(null);
      } else {
        const errorData = await response.json();
        console.error('Error deleting blog:', errorData);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleCommentSubmit = async (comment) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/blogs/${blog._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlog(updatedBlog);
      } else {
        const errorData = await response.json();
        console.error('Error submitting comment:', errorData);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection blog={blog} />
      <BlogContent blog={blog} isAdmin={isAdmin} onEdit={handleEdit} onSave={handleSave} handleDelete={handleDelete} />
      <Comments comments={blog.comments} handleCommentSubmit={handleCommentSubmit} />
    </div>
  )
}

export default BlogView;