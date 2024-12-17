import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconButton, TextField, Dialog } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CryptoJS from 'crypto-js';
import { Helmet } from 'react-helmet-async';
import ServiceDetail from '../components/ServiceDetail';
import axios from 'axios';
import { BACKEND_URL } from '../constants/index';

const LawServicePage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [headerData, setHeaderData] = useState({
    title: '',
    subtitle: '',
    isEditing: false,
  });
  const [selectedService, setSelectedService] = useState(null);
  const [serviceCategories, setServiceCategories] = useState([]);

  useEffect(() => {
    fetchLegalServices();
    checkAdminStatus();
  }, []);

  const fetchLegalServices = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/services`);
      const { headerData, serviceCategories } = response.data;
      setHeaderData(headerData);
      setServiceCategories(serviceCategories);
    } catch (error) {
      console.error('Error fetching legal services:', error);
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
  };

  const toggleHeaderEdit = () => {
    if (!isAdmin) return;
    if (headerData.isEditing) {
      saveHeaderData();
    } else {
      setHeaderData(prev => ({ ...prev, isEditing: !prev.isEditing }));
    }
  };

  const toggleCategoryEdit = (categoryIndex) => {
    if (!isAdmin) return;
    const category = serviceCategories[categoryIndex];
    if (category.isEditing) {
      saveCategory(category.id, { title: category.title, motto: category.motto }, categoryIndex);
    } else {
      setServiceCategories(prev => prev.map((cat, idx) => 
        idx === categoryIndex ? { ...cat, isEditing: !cat.isEditing } : cat
      ));
    }
  };

  const toggleServiceEdit = (categoryIndex, serviceIndex) => {
    if (!isAdmin) return;
    const category = serviceCategories[categoryIndex];
    const service = category.services[serviceIndex];
    if (service.isEditing) {
      saveService(category.id, service.id, { title: service.title, description: service.description }, categoryIndex, serviceIndex);
    } else {
      setServiceCategories(prev => prev.map((cat, catIdx) => 
        catIdx === categoryIndex ? {
          ...cat,
          services: cat.services.map((srv, srvIdx) => 
            srvIdx === serviceIndex ? { ...srv, isEditing: !srv.isEditing } : srv
          )
        } : cat
      ));
    }
  };

  const updateService = (categoryIndex, serviceIndex, field, value) => {
    setServiceCategories(prev => prev.map((cat, catIdx) => 
      catIdx === categoryIndex ? {
        ...cat,
        services: cat.services.map((service, srvIdx) => 
          srvIdx === serviceIndex ? { ...service, [field]: value } : service
        )
      } : cat
    ));
  };

  const handleServiceClick = (service) => {
    if (!service.isEditing) {
      setSelectedService(service.id);
    }
  };

  const saveHeaderData = async () => {
    try {
      await axios.patch(`${BACKEND_URL}/api/services/header`, headerData);
      setHeaderData(prev => ({ ...prev, isEditing: false }));
    } catch (error) {
      console.error('Error saving header data:', error);
    }
  };

  const saveCategory = async (categoryId, categoryData, categoryIndex) => {
    try {
      await axios.patch(`${BACKEND_URL}/api/services/categories/${categoryId}`, categoryData);
      toggleCategoryEdit(categoryIndex);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const saveService = async (categoryId, serviceId, serviceData, categoryIndex, serviceIndex) => {
    try {
      await axios.patch(`${BACKEND_URL}/api/services/categories/${categoryId}/services/${serviceId}`, serviceData);
      toggleServiceEdit(categoryIndex, serviceIndex);
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Legal Services | ClauseCraftCounsel - Legal Solutions</title>
        <meta name="description" content="Expert legal services including corporate law, litigation, documentation, and legal consulting for businesses, lawyers, and law students. Get professional legal assistance today." />
        <meta name="keywords" content="legal services, corporate law, business structuring, contract drafting, legal consulting, law firm services, litigation support, legal documentation" />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content="Legal Services | ClauseCraftCounsel - Professional Legal Solutions" />
        <meta property="og:description" content={headerData.subtitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="ClauseCraftCounsel" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Legal Services | ClauseCraftCounsel" />
        <meta name="twitter:description" content={headerData.subtitle} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
      </Helmet>

      <main className="bg-gradient-to-b from-slate-50 to-slate-100 py-16 sm:py-28">
        <nav aria-label="breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
          <ol className="flex text-sm text-gray-500">
            <li><a href="/" className="hover:text-gray-700">Home</a></li>
            <li className="mx-2">/</li>
            <li aria-current="page">Legal Services</li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.header initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} className="text-center mb-12 sm:mb-20 relative">
            {headerData.isEditing ? (
              <div className="space-y-4">
                <TextField fullWidth value={headerData.title} onChange={(e) => setHeaderData({...headerData, title: e.target.value})} variant="outlined"/>
                <TextField fullWidth value={headerData.subtitle} onChange={(e) => setHeaderData({...headerData, subtitle: e.target.value})} variant="outlined"/>
                {isAdmin && <IconButton onClick={saveHeaderData} aria-label="Save changes"><SaveIcon /></IconButton>}
              </div>
            ) : (
              <>
                <h1 className="font-cormorant text-3xl sm:text-[45px] leading-tight sm:leading-[53px] font-bold text-[#1A1A1A] mb-4 sm:mb-8">{headerData.title}</h1>
                <p className="font-cormorant text-xl sm:text-2xl text-[#4A4A4A] max-w-3xl mx-auto">{headerData.subtitle}</p>
                {isAdmin && <IconButton onClick={toggleHeaderEdit} aria-label="Edit content"><EditIcon /></IconButton>}
              </>
            )}
          </motion.header>

          <section className="service-categories">
            {serviceCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.id} 
                initial={{opacity: 0}} 
                animate={{opacity: 1}} 
                className="mb-12 sm:mb-20"
                itemScope 
                itemType="https://schema.org/Service"
              >
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                  <motion.div className="w-full sm:w-1/4">
                    <div className="sm:sticky sm:top-28 relative">
                      {category.isEditing ? (
                        <div className="space-y-4">
                          <TextField fullWidth value={category.title} onChange={(e) => updateService(categoryIndex, null, 'title', e.target.value)} variant="outlined"/>
                          <TextField fullWidth value={category.motto} onChange={(e) => updateService(categoryIndex, null, 'motto', e.target.value)} variant="outlined"/>
                          {isAdmin && <IconButton onClick={() => saveCategory(category.id, { title: category.title, motto: category.motto }, categoryIndex)} className="absolute right-0 top-0"><SaveIcon /></IconButton>}
                        </div>
                      ) : (
                        <>
                          <h2 className="font-cormorant text-3xl sm:text-[40px] font-bold text-[#1A1A1A] mb-2 sm:mb-4">{category.title}</h2>
                          <p className="font-cormorant text-lg sm:text-xl text-[#B8860B]">{category.motto}</p>
                          {isAdmin && <IconButton onClick={() => toggleCategoryEdit(categoryIndex)} className="absolute right-0 top-0"><EditIcon /></IconButton>}
                        </>
                      )}
                    </div>
                  </motion.div>

                  <div className="hidden sm:block w-px bg-[#E8E8E8] self-stretch"></div>

                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                      {category.services.map((service, serviceIndex) => (
                        <motion.div
                          key={service.id}
                          onClick={() => handleServiceClick(service)}
                          className="cursor-pointer bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8E8] relative"
                        >
                          {service.isEditing ? (
                            <div className="space-y-4">
                              <TextField fullWidth value={service.title} onChange={(e) => updateService(categoryIndex, serviceIndex, 'title', e.target.value)} variant="outlined"/>
                              <TextField fullWidth multiline rows={4} value={service.description} onChange={(e) => updateService(categoryIndex, serviceIndex, 'description', e.target.value)} variant="outlined"/>
                              {isAdmin && <IconButton onClick={() => saveService(category.id, service.id, { title: service.title, description: service.description }, categoryIndex, serviceIndex)} className="absolute right-2 top-2"><SaveIcon /></IconButton>}
                            </div>
                          ) : (
                            <>
                              <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-[#F5EEE6] rounded-lg flex items-center justify-center">
                                <i className="material-symbols-outlined text-xl sm:text-2xl text-[#B8860B]">{service.icon}</i>
                              </div>
                              <h3 className="font-cormorant text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-[#1A1A1A]">{service.title}</h3>
                              <p className="text-[#4A4A4A] text-xs sm:text-sm leading-relaxed">{service.description}</p>
                              {isAdmin && <IconButton onClick={() => toggleServiceEdit(categoryIndex, serviceIndex)} className="absolute right-2 top-2"><EditIcon /></IconButton>}
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>
        </div>
      </main>

      <Dialog
        open={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        maxWidth="xl"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: '16px',
            width: '100%',
            maxWidth: 'xl',
            borderRadius: '40px',
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          zIndex: 9999,
          position: 'fixed',
        }}
      >
        {selectedService && (
          <ServiceDetail
            serviceId={selectedService}
            onClose={() => setSelectedService(null)}
            isAdmin={isAdmin}
          />
        )}
      </Dialog>
    </>
  );
};

export default LawServicePage;