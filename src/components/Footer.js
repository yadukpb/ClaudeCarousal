import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { BACKEND_URL } from '../constants'

const Footer = () => {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/contact/content`);
        const data = await response.json();
        setContactInfo(data.contactInfo);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/contact/messages-only`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleServiceClick = (e, href) => {
    e.preventDefault();
    navigate(href);
    setTimeout(() => {
      const element = document.getElementById('corporate-section');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Blog & Insights', href: '/blog' },
    { title: 'Work with Us', href: '/careers' },
    { title: 'Contact', href: '/contact' },
  ];

  const services = [
    { title: 'For Corporates', href: '/services', scrollTo: 'corporate-section' },
    { title: 'For Lawyers', href: '/services/lawyers' },
    { title: 'For Law Students', href: '/services/students' },
    { title: 'Free Consultation', href: '/consultation' },
  ];

  const socialLinks = [
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Facebook, href: '#', label: 'Facebook' }
  ];

  return (
    <footer className="bg-[#1c1c1c] text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-6">
            <img 
              src="/logo.png" 
              alt="ClauseCounselCraft" 
              className="h-auto w-auto"
            />
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
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

          <div>
            <h3 className="text-white text-lg font-medium mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.title}>
                  <a 
                    href={service.href}
                    className="hover:text-white transition-colors duration-200"
                    onClick={(e) => service.scrollTo ? handleServiceClick(e, service.href) : null}
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail size={20} className="mt-1 flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="mt-1 flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <p className="mb-3">Follow us:</p>
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, href, label }, index) => (
                  <a
                    key={index}
                    href={href}
                    aria-label={label}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center w-[20px] h-[20px]"
                  >
                    <Icon className="w-[20px] h-[20px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ClauseCounselCraft. All Rights Reserved
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;