import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GavelIcon from '@mui/icons-material/Gavel';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import BalanceIcon from '@mui/icons-material/Balance';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton, TextField } from '@mui/material';
import CryptoJS from 'crypto-js';

const WhyChooseUs = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [headerData, setHeaderData] = useState({
    title: "Why Choose ClauseCraft Counsel?",
    subtitle: "Empowering legal excellence through research, expertise, and innovation",
    isEditing: false
  });

  const [features, setFeatures] = useState([
    {
      id: 1,
      icon: <GavelIcon sx={{ fontSize: 32, color: '#fff' }} />,
      title: "Legal Innovation",
      description: "Leveraging cutting-edge technology and innovative approaches to deliver efficient and modern legal solutions.",
      isEditing: false
    },
    {
      id: 2,
      icon: <SearchIcon sx={{ fontSize: 32, color: '#fff' }} />,
      title: "Research Expertise",
      description: "Providing comprehensive legal research support to lawyers, helping them manage workload efficiently and meet deadlines.",
      isEditing: false
    },
    {
      id: 3,
      icon: <SchoolIcon sx={{ fontSize: 32, color: '#fff' }} />,
      title: "Academic Support",
      description: "Offering specialized assistance for law students with projects, moots, and research papers through guided mentorship.",
      isEditing: false
    },
    {
      id: 4,
      icon: <BusinessIcon sx={{ fontSize: 32, color: '#fff' }} />,
      title: "Corporate Solutions",
      description: "Delivering practical legal solutions for startups and corporations, from business structuring to compliance management.",
      isEditing: false
    },
    {
      id: 5,
      icon: <BalanceIcon sx={{ fontSize: 32, color: '#fff' }} />,
      title: "Ethical Practice",
      description: "Maintaining highest standards of legal ethics and professional conduct while delivering exceptional results for our clients.",
      isEditing: false
    },
    {
      id: 6,
      icon: <SupportAgentIcon sx={{ fontSize: 32, color: '#fff' }} />,
      title: "24/7 Support",
      description: "Round-the-clock availability for urgent legal matters ensuring timely assistance when you need it most.",
      isEditing: false
    }
  ]);

  useEffect(() => {
    const checkAdminStatus = () => {
      const encryptedUser = localStorage.getItem('user');
      if (encryptedUser) {
        try {
          const key = process.env.REACT_APP_ENCRYPTION_KEY;
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedUser, key);
          const userString = decryptedBytes.toString(CryptoJS.enc.Utf8);
          const user = JSON.parse(userString);
          setIsAdmin(user.role === 'admin');
        } catch (error) {
          setIsAdmin(false);
        }
      }
    };

    checkAdminStatus();
  }, []);

  const handleFeatureEdit = (id, field, value) => {
    setFeatures(prevFeatures =>
      prevFeatures.map(feature =>
        feature.id === id ? { ...feature, [field]: value } : feature
      )
    );
  };

  const toggleFeatureEdit = (id) => {
    if (!isAdmin) return;
    setFeatures(prevFeatures =>
      prevFeatures.map(feature =>
        feature.id === id ? { ...feature, isEditing: !feature.isEditing } : feature
      )
    );
  };

  const toggleHeaderEdit = () => {
    if (!isAdmin) return;
    setHeaderData(prev => ({ ...prev, isEditing: !prev.isEditing }));
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{opacity: 0, y: -20}} 
          animate={{opacity: 1, y: 0}} 
          className="text-center mb-20 relative"
        >
          {headerData.isEditing ? (
            <div className="space-y-4">
              <TextField
                fullWidth
                value={headerData.title}
                onChange={(e) => setHeaderData({...headerData, title: e.target.value})}
                variant="outlined"
              />
              <TextField
                fullWidth
                value={headerData.subtitle}
                onChange={(e) => setHeaderData({...headerData, subtitle: e.target.value})}
                variant="outlined"
              />
              {isAdmin && (
                <IconButton onClick={toggleHeaderEdit} className="absolute right-0 top-0">
                  <SaveIcon />
                </IconButton>
              )}
            </div>
          ) : (
            <>
              <h2 className="font-cormorant text-[45px] leading-[53px] font-bold text-[#1A1A1A] mb-8">
                {headerData.title}
              </h2>
              <p className="font-cormorant text-2xl text-[#4A4A4A] max-w-3xl mx-auto">
                {headerData.subtitle}
              </p>
              {isAdmin && (
                <IconButton onClick={toggleHeaderEdit} className="absolute right-0 top-0">
                  <EditIcon />
                </IconButton>
              )}
            </>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: feature.id * 0.1}}
              whileHover={{y: -5, scale: 1.02}}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8E8] relative"
            >
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#F5D0A9] to-[#B8860B] rounded-lg flex items-center justify-center shadow-md">
                {feature.icon}
              </div>
              {feature.isEditing ? (
                <div className="space-y-4">
                  <TextField
                    fullWidth
                    value={feature.title}
                    onChange={(e) => handleFeatureEdit(feature.id, 'title', e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={feature.description}
                    onChange={(e) => handleFeatureEdit(feature.id, 'description', e.target.value)}
                    variant="outlined"
                  />
                  {isAdmin && (
                    <IconButton 
                      onClick={() => toggleFeatureEdit(feature.id)} 
                      className="absolute right-2 top-2"
                    >
                      <SaveIcon />
                    </IconButton>
                  )}
                </div>
              ) : (
                <>
                  <h3 className="font-cormorant text-xl font-bold mb-4 text-[#1A1A1A]">
                    {feature.title}
                  </h3>
                  <p className="text-[#4A4A4A] text-base leading-relaxed">
                    {feature.description}
                  </p>
                  {isAdmin && (
                    <IconButton 
                      onClick={() => toggleFeatureEdit(feature.id)} 
                      className="absolute right-2 top-2"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;