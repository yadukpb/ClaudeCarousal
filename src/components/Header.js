import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../constants'

// First, make sure to import Jost font in your global CSS or index.css:
// @import url('https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap');
// And add Jost to your tailwind.config.js:
// extend: {
//   fontFamily: {
//     jost: ['Jost', 'sans-serif'],
//   },
// }

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const userProfile = {
    name: "John Doe",
    image: "/profile-picture.jpg"
  };

  const profileMenuItems = [
    { name: 'My Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: 'Logout', href: '/logout' }
  ];

  const applicationFields = [
    { name: 'First Name', key: 'firstName' },
    { name: 'Last Name', key: 'lastName' },
    { name: 'Email', key: 'email' },
    { name: 'Contact Number', key: 'contactNumber' },
    { name: 'Preferred Month', key: 'preferredMonth' },
    { name: 'Internship Duration', key: 'internshipDuration' },
    { name: 'Preferred Practice Area', key: 'preferredPracticeArea' },
    { name: 'Created At', key: 'createdAt' },
    { name: 'Updated At', key: 'updatedAt' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHomePage]);

  useEffect(() => {
    const checkAdminStatus = () => {
      const encryptedTokens = localStorage.getItem('tokens');
      const userData = localStorage.getItem('userData');
      if (encryptedTokens && userData) {
        try {
          const user = JSON.parse(userData).user;
          setIsAdmin(user.role === 'admin');
          setIsLoggedIn(true);
        } catch (error) {
          setIsAdmin(false);
          setIsLoggedIn(false);
        }
      } else {
        setIsAdmin(false);
        setIsLoggedIn(false);
      }
    };

    checkAdminStatus();
  }, []);

  const navigationItems = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'WORK WITH US', href: '/work-with-us' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'BLOGS', href: '/blog' },
    { name: 'CONTACT US', href: '/contact' },
    { name: 'DASHBOARD', href: '/dashboard' }
  ].map(item => ({
    ...item,
    className: `font-jost text-[16px] font-[500] ${isHomePage && !isScrolled ? 'text-white hover:text-[rgb(25,23,20)]' : 'text-[rgb(25,23,20)]'} leading-normal hover:bg-[#EFE6DA] transition-all duration-300 px-3 py-1.5 rounded-[20px]`
  }));

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
      (!isHomePage || isScrolled)
        ? 'bg-white border-gray-200' 
        : 'bg-black/5 backdrop-blur-md border-gray-200/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 2xl:px-0">
        <div className="flex items-center justify-between h-[90px]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
              isOpen ? 'bg-[#EFE6DA]' : 'hover:bg-[#EFE6DA]'
            }`}
          >
            <div className={`w-6 h-0.5 bg-current transform transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : 'mb-1.5'
            }`}></div>
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'mb-1.5'
            }`}></div>
            <div className={`w-6 h-0.5 bg-current transform transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></div>
          </button>

          <nav className="hidden lg:flex items-center justify-between w-full">
            <div className="flex items-center gap-8 flex-1 justify-end">
              {navigationItems.slice(0, 3).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={item.className}
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            <div className="mx-8">
              <img 
                src={isScrolled ? "/logo.png" : "/logo-nobg.png"}
                alt="Logo" 
                className="h-[90px] object-contain cursor-pointer"
                onClick={() => window.location.href = '/'}
                onError={(e) => console.log("Error loading image:", e.target.src)}
              />
            </div>
            
            <div className="flex items-center gap-8 flex-1">
              {navigationItems.slice(3).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={item.className}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          <div className="lg:hidden">
            <img 
              src={isScrolled ? "/logo.png" : "/logo-nobg.png"}
              alt="Logo" 
              className="h-[60px] object-contain cursor-pointer"
              onClick={() => window.location.href = '/'}
              onError={(e) => console.log("Error loading image:", e.target.src)}
            />
          </div>

          <div className="flex items-center">
            <div className="relative">
              {isAdmin && isLoggedIn ? (
                <button 
                  onClick={() => window.location.href = '/login'}
                  className={`${
                    isScrolled ? 'text-[rgb(25,23,20)]' : 'text-white'
                  } px-3 sm:px-4 py-2 rounded-full hover:bg-[#EFE6DA] transition-all duration-300 flex items-center space-x-2`}
                >
                  <UserCircle className="w-5 sm:w-6 h-5 sm:h-6" />
                  <span className="hidden sm:inline font-jost text-[16px]">Login</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden fixed top-[90px] left-0 right-0 h-[calc(100vh-90px)] backdrop-blur-md bg-white/95 transform transition-all duration-300 overflow-hidden">
            <div className="px-6 py-8 space-y-6 h-full overflow-y-auto">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block font-jost text-[18px] font-medium px-4 py-4 text-[rgb(25,23,20)] hover:bg-[#EFE6DA] rounded-2xl transition-all duration-300 transform hover:translate-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;