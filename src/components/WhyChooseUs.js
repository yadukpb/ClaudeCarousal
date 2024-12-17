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
import { BACKEND_URL } from '../constants';

const WhyChooseUs = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [headerData, setHeaderData] = useState({
    title: "",
    subtitle: "",
    isEditing: false
  });
  const [features, setFeatures] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(true);

  useEffect(() => {
    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false);
    }
    checkAdminStatus();
  }, [shouldFetchData]);

  const fetchData = async () => {
    try {
      const tokens = localStorage.getItem('tokens');
      const decryptedTokens = CryptoJS.AES.decrypt(
        tokens,
        process.env.REACT_APP_ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);
      
      const { accessToken } = JSON.parse(decryptedTokens);
      
      const response = await fetch(`${BACKEND_URL}/api/why-choose-us`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const { data } = await response.json();
      setHeaderData({
        title: data.header.title,
        subtitle: data.header.subtitle,
        isEditing: false
      });
      
      const iconMap = {
        GavelIcon: <GavelIcon />,
        SearchIcon: <SearchIcon />,
        SchoolIcon: <SchoolIcon />,
        BusinessIcon: <BusinessIcon />,
        BalanceIcon: <BalanceIcon />,
        SupportAgentIcon: <SupportAgentIcon />
      };
      
      setFeatures(data.features.map(f => ({ 
        ...f, 
        isEditing: false,
        icon: iconMap[f.icon]
      })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveHeader = async () => {
    try {
      const tokens = localStorage.getItem('tokens');
      const decryptedTokens = CryptoJS.AES.decrypt(
        tokens,
        process.env.REACT_APP_ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);
      
      const { accessToken } = JSON.parse(decryptedTokens);
      
      const response = await fetch(`${BACKEND_URL}/api/why-choose-us/header`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title: headerData.title,
          subtitle: headerData.subtitle
        })
      });
      if (response.ok) {
        toggleHeaderEdit();
        setShouldFetchData(true);
      }
    } catch (error) {
      console.error('Error saving header:', error);
    }
  };

  const saveFeature = async (id) => {
    try {
      const tokens = localStorage.getItem('tokens');
      const decryptedTokens = CryptoJS.AES.decrypt(
        tokens,
        process.env.REACT_APP_ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);
      
      const { accessToken } = JSON.parse(decryptedTokens);
      
      const feature = features.find(f => f._id === id);
      const response = await fetch(`${BACKEND_URL}/api/why-choose-us/feature/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title: feature.title,
          description: feature.description
        })
      });
      if (response.ok) {
        toggleFeatureEdit(id);
        setShouldFetchData(true);
      }
    } catch (error) {
      console.error('Error saving feature:', error);
    }
  };

  const checkAdminStatus = () => {
    const encryptedTokens = localStorage.getItem('tokens')
    const userData = localStorage.getItem('userData')
    if (encryptedTokens && userData) {
      try {
        const user = JSON.parse(userData).user
        setIsAdmin(user.role === 'admin')
      } catch (error) {
        setIsAdmin(false)
      }
    }
  }

  const toggleHeaderEdit = () => {
    if (!isAdmin) return;
    if (headerData.isEditing) {
      saveHeader();
    } else {
      setHeaderData(prev => ({ ...prev, isEditing: true }));
    }
  };

  const toggleFeatureEdit = (id) => {
    if (!isAdmin) return;
    const feature = features.find(f => f._id === id);
    if (feature.isEditing) {
      saveFeature(id);
    } else {
      setFeatures(prevFeatures =>
        prevFeatures.map(f =>
          f._id === id ? { ...f, isEditing: true } : f
        )
      );
    }
  };

  const handleFeatureEdit = (id, field, value) => {
    setFeatures(prevFeatures =>
      prevFeatures.map(f =>
        f._id === id ? { ...f, [field]: value } : f
      )
    );
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
              key={feature._id}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: feature._id * 0.1}}
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
                    onChange={(e) => handleFeatureEdit(feature._id, 'title', e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={feature.description}
                    onChange={(e) => handleFeatureEdit(feature._id, 'description', e.target.value)}
                    variant="outlined"
                  />
                  {isAdmin && (
                    <IconButton 
                      onClick={() => toggleFeatureEdit(feature._id)}
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
                      onClick={() => toggleFeatureEdit(feature._id)}
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