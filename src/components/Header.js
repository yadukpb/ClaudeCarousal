import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';

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
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const userProfile = {
    name: "John Doe",
    image: "/profile-picture.jpg"
  };

  const profileMenuItems = [
    { name: 'My Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: 'Logout', href: '/logout' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'WORK WITH US', href: '/work-with-us' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'BLOGS', href: '/blogs' },
    { name: 'CONTACT US', href: '/contact' }
  ].map(item => ({
    ...item,
    className: `font-jost text-[16px] font-[500] ${isScrolled ? 'text-[rgb(25,23,20)]' : 'text-white'} leading-normal hover:bg-[#EFE6DA] transition-all duration-300 px-3 py-1.5 rounded-[20px]`
  }));

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-white border-gray-200' 
        : 'bg-black/5 backdrop-blur-md border-gray-200/20'
    }`}>
      <div className="max-w-7xl mx-auto px-6 2xl:px-0">
        <div className="flex items-center justify-between h-[90px]">
          <div className="w-10"></div>

          <nav className="hidden lg:flex items-center">
            <div className="flex items-center space-x-4">
              <a href={navigationItems[0].href} className={navigationItems[0].className}>
                {navigationItems[0].name}
              </a>
              
              <a href={navigationItems[1].href} className={navigationItems[1].className}>
                {navigationItems[1].name}
              </a>
            </div>
            
            <div className="flex items-center space-x-12 ml-12">
              {navigationItems.slice(2, 3).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={item.className}
                >
                  {item.name}
                </a>
              ))}
              
              <img 
                src={isScrolled ? "/logo.png" : "/logo-nobg.png"}
                alt="Logo" 
                className="h-[90px] mx-8 object-contain"
              />
              
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

          <div className="flex items-center">
            <div className="relative">
              {isLoggedIn ? (
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-[#EFE6DA] transition-all duration-300"
                >
                  <img 
                    src={userProfile.image} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
              ) : (
                <button 
                  onClick={() => window.location.href = '/login'}
                  className={`${
                    isScrolled ? 'text-[rgb(25,23,20)]' : 'text-white'
                  } px-4 py-2 rounded-full hover:bg-[#EFE6DA] transition-all duration-300 flex items-center space-x-2`}
                >
                  <UserCircle className="w-6 h-6" />
                  <span className="font-jost text-[16px]">Login</span>
                </button>
              )}

              {showProfileMenu && isLoggedIn && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {profileMenuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EFE6DA] font-jost"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="block font-jost text-[16px] font-medium px-4 py-2 text-[rgb(25,23,20)] rounded-full hover:bg-[#EFE6DA] transition-all duration-300"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;