import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center mb-8 md:mb-0">
    <img src={icon} alt={title} className="w-20 h-20 mb-4" />
    <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-lg text-gray-600 max-w-sm">{description}</p>
  </div>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: "https://20231019.fs1.hubspotusercontent-na1.net/hubfs/20231019/raw_assets/public/ainjibi/images/choose/time.svg",
      title: "Exclusively Areas",
      description: "Improve himmr believe opinion offered amemet and endmi cheered forbade mnendly asem des stronge speedily by recurred on interest."
    },
    {
      icon: "https://20231019.fs1.hubspotusercontent-na1.net/hubfs/20231019/raw_assets/public/ainjibi/images/choose/time.svg",
      title: "Group of Lawyers",
      description: "Improve himmr believe opinion offered amemet and endmi cheered forbade mnendly asem des stronge speedily by recurred on interest."
    },
    {
      icon: "https://20231019.fs1.hubspotusercontent-na1.net/hubfs/20231019/raw_assets/public/ainjibi/images/choose/time.svg",
      title: "Cases Results",
      description: "Improve himmr believe opinion offered amemet and endmi cheered forbade mnendly asem des stronge speedily by recurred on interest."
    },
    {
      icon: "https://20231019.fs1.hubspotusercontent-na1.net/hubfs/20231019/raw_assets/public/ainjibi/images/choose/time.svg",
      title: "Experts in Law",
      description: "Improve himmr believe opinion offered amemet and endmi cheered forbade mnendly asem des stronge speedily by recurred on interest."
    }
  ];

  return (
    <div className="relative bg-white min-h-screen">
      <div className="absolute right-0 top-0 h-full w-1/3 hidden lg:block">
        <img 
          src="https://f.hubspotusercontent10.net/hubfs/20231019/raw_assets/public/ainjibi/images/layer-img.png"
          alt="Lawyer"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-5xl">
          <h2 className="font-['Hepta_Slab'] text-[116px] leading-[116px] text-[#343842] font-[500] mb-6">Why Choose Us?</h2>
          <p className="font-['Jost'] text-[32px] leading-[32px] text-[#343842] font-normal mb-16">Incommode so intention defective at convinced.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;