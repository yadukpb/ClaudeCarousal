import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconButton, TextField, Dialog } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CryptoJS from 'crypto-js';
import { Helmet } from 'react-helmet-async';
import ServiceDetail from '../components/ServiceDetail';

const LawServicePage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [headerData, setHeaderData] = useState({
    title: "Legal Services Excellence",
    subtitle: "Comprehensive legal solutions tailored to your specific needs",
    isEditing: false
  });
  const [selectedService, setSelectedService] = useState(null);

  const [serviceCategories, setServiceCategories] = useState([
    {
      title: "For Corporates",
      motto: "Empowering Small Firms with Practical Legal Solutions",
      isEditing: false,
      services: [
        { title: "Business Structuring Advice", description: "Advising on the best structure for tax efficiency and liability protection", icon: "business", isEditing: false },
        { title: "Contract Drafting and Review", description: "Preparing and reviewing service agreements, NDAs, vendor agreements, employment contracts, and more", icon: "description", isEditing: false },
        { title: "Lease and Licensing", description: "Tailoring agreements for office spaces and operational needs", icon: "real_estate_agent", isEditing: false },
        { title: "Standard Terms", description: "Drafting for products/services offered by the firm", icon: "gavel", isEditing: false },
        { title: "Employment Contracts", description: "Ensuring legally sound contracts for hiring", icon: "group", isEditing: false },
        { title: "E-commerce Solutions", description: "Drafting website terms, privacy policies, and compliance with consumer protection laws", icon: "shopping_cart", isEditing: false },
        { title: "Preliminary Documents", description: "Drafting MoU, LoI, and Term sheets for various business needs", icon: "file_present", isEditing: false },
        { title: "Content Creation", description: "Writing blog posts, articles, or newsletters to attract clients", icon: "edit_note", isEditing: false }
      ]
    },
    {
      title: "For Lawyers",
      motto: "Focused Research, Sharper Results",
      isEditing: false,
      services: [
        { title: "Case Law Research", description: "Providing precise and well-researched case law summaries", icon: "search", isEditing: false },
        { title: "Document Drafting", description: "Preparing pleadings, affidavits, legal notices, and contracts", icon: "draft", isEditing: false },
        { title: "Pleadings Preparation", description: "Writing detailed legal memos or briefs for court submissions", icon: "description", isEditing: false },
        { title: "Precedent Development", description: "Creating templates for frequently used legal documents", icon: "file_copy", isEditing: false },
        { title: "Case Analysis", description: "Helping with review of facts, legal issues, and arguments", icon: "analytics", isEditing: false },
        { title: "Legal Updates", description: "Providing updates on new laws, regulations, and judgments", icon: "update", isEditing: false },
        { title: "Legal Opinions", description: "Assisting clients with prospective legal hurdles and compliances", icon: "balance", isEditing: false },
        { title: "Limitation Tracking", description: "Helping monitor and manage deadlines", icon: "schedule", isEditing: false }
      ]
    },
    {
      title: "For Budding Lawyers",
      motto: "Turning Good Projects into Great Ones",
      isEditing: false,
      services: [
        { title: "Article Review", description: "Reviewing and refining research papers, essays, and articles for publication", icon: "rate_review", isEditing: false },
        { title: "Project Assistance", description: "Assisting with structuring and formatting academic assignments", icon: "assignment", isEditing: false },
        { title: "Moot Court Prep", description: "Offering guidance on memorial drafting, research, and oral arguments", icon: "school", isEditing: false },
        { title: "Thesis Support", description: "Supporting in topic selection, research, and writing for dissertations", icon: "menu_book", isEditing: false },
        { title: "Case Summaries", description: "Providing concise summaries and analysis for academic purposes", icon: "summarize", isEditing: false },
        { title: "Application Help", description: "Assisting with CV and cover letter drafting for internships", icon: "work", isEditing: false },
        { title: "Mock Interviews", description: "Conducting simulated interviews for internship preparation", icon: "record_voice_over", isEditing: false }
      ]
    }
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "ClauseCraftCounsel Legal Services",
    "description": headerData.subtitle,
    "url": window.location.href,
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "20.5937",
        "longitude": "78.9629"
      },
      "geoRadius": "3000"
    },
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India",
      "addressLocality": "Your City",
      "addressRegion": "Your State",
      "postalCode": "Your Postal Code",
      "streetAddress": "Your Street Address"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/yourpage",
      "https://www.linkedin.com/company/yourcompany",
      "https://twitter.com/yourhandle"
    ],
    "hasCredential": [{
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Bar License",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Bar Council of India"
      }
    }],
    "serviceType": serviceCategories.map(category => ({
      "@type": "Service",
      "name": category.title,
      "description": category.motto,
      "provider": {
        "@type": "LegalService",
        "name": "ClauseCraftCounsel",
        "legalName": "ClauseCraftCounsel Legal Services Pvt. Ltd."
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "itemListElement": category.services.map(service => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceType": "Online",
              "serviceUrl": `${window.location.origin}/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`
            }
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "eligibleCustomerType": ["Business", "Individual"]
        }))
      }
    }))
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": window.location.origin,
      "image": `${window.location.origin}/logo.png`
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Legal Services",
      "item": window.location.href,
      "image": `${window.location.origin}/services-banner.png`
    }]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What legal services do you offer for corporations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer comprehensive legal services including business structuring, contract drafting, lease agreements, employment contracts, and more.",
        "dateCreated": "2024-01-01",
        "upvoteCount": 45,
        "author": {
          "@type": "Organization",
          "name": "ClauseCraftCounsel"
        }
      }
    }, {
      "@type": "Question",
      "name": "Do you provide services for law students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer specialized services for law students including article review, project assistance, moot court preparation, and thesis support.",
        "dateCreated": "2024-01-01",
        "upvoteCount": 38,
        "author": {
          "@type": "Organization",
          "name": "ClauseCraftCounsel"
        }
      }
    }]
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "LawFirm",
    "name": "ClauseCraftCounsel",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Founder Name"
    },
    "knowsLanguage": ["English", "Hindi"],
    "availableLanguage": ["English", "Hindi"],
    "memberOf": [{
      "@type": "Organization",
      "name": "Bar Council of India"
    }],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Legal Services Catalog",
      "itemListElement": serviceCategories.flatMap(category => 
        category.services.map(service => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title,
            "description": service.description
          }
        }))
      )
    }
  };

  const professionalServiceStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ClauseCraftCounsel Legal Consulting",
    "serviceType": ["Legal Consultation", "Document Drafting", "Legal Research"],
    "termsOfService": `${window.location.origin}/terms`,
    "paymentAccepted": ["Credit Card", "Bank Transfer"],
    "currenciesAccepted": "INR",
    "slogan": "Excellence in Legal Solutions",
    "keywords": "legal services, corporate law, contract drafting, legal consulting, law firm"
  };

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

  const toggleHeaderEdit = () => {
    if (!isAdmin) return;
    setHeaderData(prev => ({ ...prev, isEditing: !prev.isEditing }));
  };

  const toggleCategoryEdit = (categoryIndex) => {
    if (!isAdmin) return;
    setServiceCategories(prev => prev.map((cat, idx) => 
      idx === categoryIndex ? { ...cat, isEditing: !cat.isEditing } : cat
    ));
  };

  const toggleServiceEdit = (categoryIndex, serviceIndex) => {
    if (!isAdmin) return;
    setServiceCategories(prev => prev.map((cat, catIdx) => 
      catIdx === categoryIndex ? {
        ...cat,
        services: cat.services.map((service, srvIdx) => 
          srvIdx === serviceIndex ? { ...service, isEditing: !service.isEditing } : service
        )
      } : cat
    ));
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
      setSelectedService(service)
    }
  }

  return (
    <>
      <Helmet>
        <title>Legal Services | ClauseCraftCounsel - Professional Legal Solutions</title>
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
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(professionalServiceStructuredData)}
        </script>
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
                {isAdmin && <IconButton onClick={toggleHeaderEdit} aria-label="Save changes"><SaveIcon /></IconButton>}
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
                key={category.title} 
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
                          <TextField fullWidth value={category.title} onChange={(e) => setServiceCategories(prev => prev.map((cat, idx) => categoryIndex === idx ? {...cat, title: e.target.value} : cat))} variant="outlined"/>
                          <TextField fullWidth value={category.motto} onChange={(e) => setServiceCategories(prev => prev.map((cat, idx) => categoryIndex === idx ? {...cat, motto: e.target.value} : cat))} variant="outlined"/>
                          {isAdmin && <IconButton onClick={() => toggleCategoryEdit(categoryIndex)} className="absolute right-0 top-0"><SaveIcon /></IconButton>}
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
                          key={service.title}
                          onClick={() => handleServiceClick(service)}
                          className="cursor-pointer bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8E8] relative"
                        >
                          {service.isEditing ? (
                            <div className="space-y-4">
                              <TextField fullWidth value={service.title} onChange={(e) => updateService(categoryIndex, serviceIndex, 'title', e.target.value)} variant="outlined"/>
                              <TextField fullWidth multiline rows={4} value={service.description} onChange={(e) => updateService(categoryIndex, serviceIndex, 'description', e.target.value)} variant="outlined"/>
                              {isAdmin && <IconButton onClick={() => toggleServiceEdit(categoryIndex, serviceIndex)} className="absolute right-2 top-2"><SaveIcon /></IconButton>}
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
      >
        {selectedService && (
          <ServiceDetail
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </Dialog>
    </>
  );
};

export default LawServicePage;