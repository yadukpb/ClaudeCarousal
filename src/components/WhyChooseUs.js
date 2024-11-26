import React from 'react';
import { motion } from 'framer-motion';
import GavelIcon from '@mui/icons-material/Gavel';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <GavelIcon sx={{ fontSize: 32, color: '#fff' }} />,
      title: "NLSIU Excellence",
      description: "Leveraging our academic excellence from National Law School of India University to deliver exceptional legal solutions."
    },
    {
      icon: <SearchIcon sx={{ fontSize: 32, color: '#fff' }} />,
      title: "Research Expertise",
      description: "Providing comprehensive legal research support to lawyers, helping them manage workload efficiently and meet deadlines."
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 32, color: '#fff' }} />,
      title: "Academic Support",
      description: "Offering specialized assistance for law students with projects, moots, and research papers through guided mentorship."
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 32, color: '#fff' }} />,
      title: "Corporate Solutions",
      description: "Delivering practical legal solutions for startups and corporations, from business structuring to compliance management."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{opacity: 0, y: -20}} 
          animate={{opacity: 1, y: 0}} 
          className="text-center mb-20"
        >
          <h2 className="font-cormorant text-[45px] leading-[53px] font-bold text-[#1A1A1A] mb-8">
            Why Choose ClauseCraft Counsel?
          </h2>
          <p className="font-cormorant text-2xl text-[#4A4A4A] max-w-3xl mx-auto">
            Empowering legal excellence through research, expertise, and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: index * 0.1}}
              whileHover={{y: -5, scale: 1.02}}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8E8]"
            >
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#F5D0A9] to-[#B8860B] rounded-lg flex items-center justify-center shadow-md">
                {feature.icon}
              </div>
              <h3 className="font-cormorant text-xl font-bold mb-4 text-[#1A1A1A]">{feature.title}</h3>
              <p className="text-[#4A4A4A] text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;