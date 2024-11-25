import React from 'react';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const companyLinks = [
    { title: 'NEWS', href: '#' },
    { title: 'OUR TEAM', href: '#' },
    { title: 'ABOUT US', href: '#' },
    { title: 'CAREERS', href: '#' },
    { title: 'CONTACT US', href: '#' },
  ];

  const categories = [
    { title: 'Civil Law', href: '#' },
    { title: 'Company', href: '#' },
    { title: 'Criminal Law', href: '#' },
    { title: 'Family Law', href: '#' },
    { title: 'Law Institutions', href: '#' },
    { title: 'Medical Law', href: '#' },
  ];

  const socialLinks = [
    { Icon: Linkedin, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Facebook, href: '#' },
  ];

  return (
    <footer className="bg-[#1c1c1c] text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col space-y-4">
            <img 
              src="/logo.png" 
              alt="The Trial Attorney Co." 
              className="h-12 w-auto"
            />
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Company links</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.title}>
                  <a 
                    href={category.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Find us */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Find us</h3>
            <address className="not-italic">
              <p>650 Birmingham St,</p>
              <p>London 3000, UK</p>
              <p className="mt-4">0600 02 52 668 774</p>
            </address>
            
            <div className="mt-6">
              <p className="mb-3">Follow us:</p>
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2020 Qode Interactive. All Rights Reserved
          </p>
          <a 
            href="#" 
            className="flex items-center text-sm text-gray-500 hover:text-white transition-colors duration-200 mt-4 md:mt-0"
          >
            Buy Theme 
            <svg 
              className="w-4 h-4 ml-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;