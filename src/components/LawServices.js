import React from 'react';

const LawServices = () => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-12 sm:pb-20">
        <div className="flex justify-between items-start mb-8 sm:mb-16">
          <div className="flex-1">
            <h1 className="font-['Hepta_Slab'] text-5xl sm:text-[116px] leading-tight sm:leading-[116px] text-[#343842] font-[500]">
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
          <div className="relative group overflow-hidden rounded-lg">
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
                <a href="#" className="text-white border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">Learn More →</a>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src="https://themes.pixelwars.org/lawly/demo-01/wp-content/uploads/sites/2/2023/08/business-team-manager-meeting-650x650.jpg"
              alt="For Lawyers"
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 transform transition-all duration-500 group-hover:from-black/60 group-hover:to-black/90">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <svg className="w-12 h-12 text-white mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.38-2.88 8.57-7 9.85-4.12-1.28-7-5.47-7-9.85V6.3l7-3.12zm-2 12.82h4v-2h-4v2zm0-4h4V8c0-1.1-.9-2-2-2s-2 .9-2 2v4z"/>
                </svg>
                <h3 className="text-white text-2xl font-semibold mb-2">For Lawyers</h3>
                <p className="text-white/90 text-center mb-4">Focused Research, Sharper Results</p>
                <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <ul className="text-white/80 text-center space-y-2 mb-4">
                    <li>Precedent Development</li>
                    <li>Legal Research Assistance</li>
                    <li>Customized Newsletters</li>
                  </ul>
                </div>
                <a href="#" className="text-white border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">Learn More →</a>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg">
            <img 
              src="https://themes.pixelwars.org/lawly/demo-01/wp-content/uploads/sites/2/2023/08/lawyers-legal-services-consulting-regard-various-contracts-plan-case-court-650x650.jpg"
              alt="For Budding Lawyers"
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 transform transition-all duration-500 group-hover:from-black/60 group-hover:to-black/90">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <svg className="w-12 h-12 text-white mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"/>
                </svg>
                <h3 className="text-white text-2xl font-semibold mb-2">For Budding Lawyers</h3>
                <p className="text-white/90 text-center mb-4">Turning Good Projects into Great Ones</p>
                <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <ul className="text-white/80 text-center space-y-2 mb-4">
                    <li>Moot Memorial Drafting</li>
                    <li>Case Law Summaries</li>
                    <li>Mock Interviews</li>
                  </ul>
                </div>
                <a href="#" className="text-white border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">Learn More →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-x-8 mb-12 sm:mb-20">
          {['col1', 'col2', 'col3'].map((col) => (
            <div key={col} className="space-y-4 sm:space-y-6">
              {services.filter(service => service.category === col).map((service, idx) => (
                <div key={idx} className="pb-4 sm:pb-6 border-b border-gray-200">
                  <h3 className="text-lg sm:text-xl text-blue-900">{service.title}</h3>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-8 mb-12 sm:mb-20">
          <div className="relative group overflow-hidden">
            <img 
              src="https://themes.pixelwars.org/lawly/demo-01/wp-content/uploads/sites/2/2023/08/business-team-manager-meeting-650x650.jpg"
              alt="Corporate Law"
              className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-semibold">Corporate Law</h3>
            </div>
          </div>
          <div className="relative group overflow-hidden">
            <img 
              src="https://themes.pixelwars.org/lawly/demo-01/wp-content/uploads/sites/2/2023/08/lawyers-legal-services-consulting-regard-various-contracts-plan-case-court-650x650.jpg"
              alt="Budding Lawyers"
              className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-semibold">Budding Lawyers</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-20">
          <div className="text-center mb-8 sm:mb-0">
            <div className="text-6xl sm:text-[120px] font-light leading-none mb-4" style={{color: 'transparent', WebkitTextStroke: '1px #e2e8f0'}}>90%</div>
            <div className="text-blue-900 text-base sm:text-lg">Case Evaluation</div>
          </div>
          <div className="text-center mb-8 sm:mb-0">
            <div className="text-6xl sm:text-[120px] font-light leading-none mb-4" style={{color: 'transparent', WebkitTextStroke: '1px #e2e8f0'}}>95%</div>
            <div className="text-blue-900 text-base sm:text-lg">Legal Research</div>
          </div>
          <div className="text-center">
            <div className="text-6xl sm:text-[120px] font-light leading-none mb-4" style={{color: 'transparent', WebkitTextStroke: '1px #e2e8f0'}}>100%</div>
            <div className="text-blue-900 text-base sm:text-lg">Negotiations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawServices;