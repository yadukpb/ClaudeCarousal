import React from 'react';
import { useNavigate } from 'react-router-dom';

const LawServices = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/services');
  };

  const services = [
    { title: 'Legal Consultation', category: 'col1' },
    { title: 'Contract Drafting and Review', category: 'col1' },
    { title: 'Litigation and Dispute Resolution', category: 'col1' },
    { title: 'Criminal Defense', category: 'col2' },
    { title: 'Family Laws', category: 'col2' },
    { title: 'Intellectual Property', category: 'col2' },
    { title: 'Immigration Law', category: 'col3' },
    { title: 'Employment Law', category: 'col3' },
    { title: 'Real Estate Law', category: 'col3' },
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-24 pb-12 sm:pb-20">
        <div className="flex justify-between items-start mb-8 sm:mb-16">
          <div className="flex-1">
            <h1 className="font-['Hepta_Slab'] text-4xl sm:text-[116px] leading-tight sm:leading-[116px] text-[#343842] font-[500] mt-8 sm:mt-0">
              Our Law<br />
              Services
            </h1>
          </div>
          
        </div>

        <h2 className="font-['Jost'] text-2xl sm:text-[32px] leading-tight sm:leading-[32px] text-[#343842] font-normal mb-4 sm:mb-6">
          Elevating Service Standards in Law
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-12 sm:mb-20 max-w-3xl">
          We provide comprehensive legal services tailored to meet your specific needs. Our experienced team of attorneys is dedicated to delivering exceptional results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          {[1, 2, 3].map((index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <img 
                src="https://themes.pixelwars.org/lawly/demo-01/wp-content/uploads/sites/2/2023/08/business-team-manager-meeting-650x650.jpg"
                alt="For Corporates"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 transform transition-all duration-500 group-hover:from-black/60 group-hover:to-black/90">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <svg className="w-12 h-12 text-white mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4Z"/>
                  </svg>
                  <h3 className="text-white text-2xl font-semibold mb-2">For Corporates</h3>
                  <p className="text-white/90 text-center mb-4">Empowering Small Firms with Practical Legal Solutions</p>
                  <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <ul className="text-white/80 text-center space-y-2 mb-4">
                      <li>Drafting NDAs, Employment Contracts</li>
                      <li>Structuring Business Operations</li>
                      <li>Custom E-Commerce Policies</li>
                    </ul>
                  </div>
                  <button onClick={handleLearnMore} className="text-white border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">Learn More →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

       

       

      </div>
    </div>
  );
};

export default LawServices;