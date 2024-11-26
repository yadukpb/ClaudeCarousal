import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';

const StickyContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl mb-4 w-[95vw] max-w-[380px] mx-auto transform transition-all duration-300 ease-in-out">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-3 md:p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="text-white text-base md:text-lg font-semibold">Contact Us</h3>
              <p className="text-blue-100 text-xs md:text-sm">We'll get back to you within 24 hours</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-200 transition-colors p-1"
            >
              <X size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 md:p-6">
            <div className="space-y-3 md:space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows="3"
                  className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Send size={16} className="md:w-[18px] md:h-[18px]" />
                Send Message
              </button>
            </div>
          </form>
          
          <div className="border-t border-gray-100 p-3 md:p-4">
            <a 
              href="tel:+1234567890"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors text-sm md:text-base"
            >
              <Phone size={16} className="md:w-[18px] md:h-[18px]" />
              <span>+91 7907458789</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-900 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center group relative"
      >
        {!isOpen ? (
          <>
            <MessageCircle size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">1</span>
          </>
        ) : (
          <X size={20} className="md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};

export default StickyContact;