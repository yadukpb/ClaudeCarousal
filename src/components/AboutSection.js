import React from 'react';

const AboutSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center space-x-4 mb-4">
        <a href="#" className="text-gray-600 px-4 py-2 rounded-full hover:bg-[#EFE6DA] transition-all duration-300">HOME</a>
        <span className="text-gray-400">/</span>
        <a href="#" className="text-gray-600 px-4 py-2 rounded-full hover:bg-[#EFE6DA] transition-all duration-300">ABOUT US</a>
      </div>

      <h1 className="text-5xl font-serif text-gray-800 mb-6">About Lawly</h1>
      
      <h2 className="text-2xl text-gray-600 mb-12">Discover Our Journey in Law</h2>
      
      <div className="border-b border-gray-200 mb-12">
        <nav className="flex space-x-8">
          <button className="border-b-2 border-blue-900 text-blue-900 pb-4 px-4 rounded-full hover:bg-[#EFE6DA] transition-all duration-300">History</button>
          <button className="text-gray-500 pb-4 px-4 rounded-full hover:bg-[#EFE6DA] transition-all duration-300">Description</button>
          <button className="text-gray-500 pb-4 px-4 rounded-full hover:bg-[#EFE6DA] transition-all duration-300">Reviews</button>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <p className="text-gray-600 leading-relaxed">
            At Clause Craft Counsel, we are more than just legal experts — we are dedicated partners on your journey towards justice and resolution. With a legacy of excellence and a commitment to upholding the principles of law, we stand as a beacon of support for individuals, businesses, and communities alike.
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 px-4 py-2 rounded-full hover:bg-[#EFE6DA] transition-all duration-300 cursor-pointer">Strategy Development</span>
                <span className="text-gray-700">95%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-900 rounded" style={{width: '95%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 px-4 py-2 rounded-full hover:bg-[#EFE6DA] transition-all duration-300 cursor-pointer">Case Assessment</span>
                <span className="text-gray-700">75%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-900 rounded" style={{width: '75%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 px-4 py-2 rounded-full hover:bg-[#EFE6DA] transition-all duration-300 cursor-pointer">Document Preparation</span>
                <span className="text-gray-700">85%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-900 rounded" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
            <img 
              src="/api/placeholder/800/800" 
              alt="Legal consultation" 
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;