import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { BACKEND_URL } from '../constants';
import CryptoJS from 'crypto-js';


const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const tokens = localStorage.getItem('tokens');
    let user = null;

    try {
      const parsedUserData = JSON.parse(userData);
      user = parsedUserData.user;
    } catch (error) {
      navigate('/login');
      return;
    }

    if (!user || !tokens || user.role !== 'admin') {
      navigate('/login');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (!process.env.REACT_APP_ENCRYPTION_KEY) {
      throw new Error('Encryption key not found in environment variables');
    }
    if (!BACKEND_URL) {
      throw new Error('Backend URL not found');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setPreviewImage(null);
  };

  const refreshToken = async () => {
    try {
      const encryptedTokens = localStorage.getItem('tokens');
      if (!encryptedTokens) {
        throw new Error('No tokens found');
      }

      const decryptedTokens = CryptoJS.AES.decrypt(
        encryptedTokens,
        process.env.REACT_APP_ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);
      
      const tokens = JSON.parse(decryptedTokens);
      
      const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: tokens.refreshToken
        })
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const newTokens = await response.json();
      const encryptedNewTokens = CryptoJS.AES.encrypt(
        JSON.stringify(newTokens),
        process.env.REACT_APP_ENCRYPTION_KEY
      ).toString();

      localStorage.setItem('tokens', encryptedNewTokens);
      return newTokens.accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      localStorage.removeItem('tokens');
      localStorage.removeItem('userData');
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.image) {
        throw new Error('Image is required');
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      let response;
      try {
        const encryptedTokens = localStorage.getItem('tokens');
        if (!encryptedTokens) throw new Error('No tokens found');
        
        const decryptedTokens = CryptoJS.AES.decrypt(
          encryptedTokens,
          process.env.REACT_APP_ENCRYPTION_KEY
        ).toString(CryptoJS.enc.Utf8);
        
        const tokens = JSON.parse(decryptedTokens);
        let accessToken = tokens.accessToken;

        response = await fetch(`${BACKEND_URL}/api/blogs`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: formDataToSend
        });

        if (response.status === 401) {
          accessToken = await refreshToken();
          response = await fetch(`${BACKEND_URL}/api/blogs`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            body: formDataToSend
          });
        }

        if (!response.ok) throw new Error(await response.text() || 'Failed to create blog');

        const result = await response.json();
        navigate('/blog');
      } catch (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-cormorant text-4xl font-bold text-[#1A1A1A] mb-8">Create New Blog Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Administrative Law">Administrative Law</option>
                  <option value="Bankruptcy Law">Bankruptcy Law</option>
                  <option value="Business Law">Business Law</option>
                  <option value="Civil Rights">Civil Rights</option>
                  <option value="Constitutional Law">Constitutional Law</option>
                  <option value="Contract Law">Contract Law</option>
                  <option value="Corporate Law">Corporate Law</option>
                  <option value="Criminal Law">Criminal Law</option>
                  <option value="Employment Law">Employment Law</option>
                  <option value="Environmental Law">Environmental Law</option>
                  <option value="Family Law">Family Law</option>
                  <option value="Financial Law">Financial Law</option>
                  <option value="Healthcare Law">Healthcare Law</option>
                  <option value="Immigration Law">Immigration Law</option>
                  <option value="Industrial Law">Industrial Law</option>
                  <option value="Insurance Law">Insurance Law</option>
                  <option value="Intellectual Property">Intellectual Property</option>
                  <option value="International Law">International Law</option>
                  <option value="Labor Law">Labor Law</option>
                  <option value="Maritime Law">Maritime Law</option>
                  <option value="Media Law">Media Law</option>
                  <option value="Personal Injury">Personal Injury</option>
                  <option value="Property Law">Property Law</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Securities Law">Securities Law</option>
                  <option value="Tax Law">Tax Law</option>
                  <option value="Technology Law">Technology Law</option>
                  <option value="Trust and Estate">Trust and Estate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                required
                placeholder="Brief summary of the blog post..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="10"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                required
                placeholder="Full blog post content..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <div className="mt-2">
                {!previewImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <span className="mt-2 block text-sm font-medium text-gray-600">
                        Click to upload image
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/blog')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
              >
                {isLoading ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;