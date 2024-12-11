import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CryptoJS from 'crypto-js'

const VisionMission = ({ title, content, isVision, isEditing, onEdit, isAdmin }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl p-8 shadow-lg border border-[#E8E8E8] relative"
  >
    {isEditing ? (
      <div className="space-y-4">
        <TextField
          fullWidth
          value={title}
          onChange={(e) => onEdit('title', e.target.value)}
          variant="outlined"
          label="Title"
        />
        {isVision ? (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => onEdit('content', e.target.value)}
            variant="outlined"
            label="Content"
          />
        ) : (
          <div className="space-y-4">
            {content.map((item, index) => (
              <TextField
                key={index}
                fullWidth
                value={item}
                onChange={(e) => onEdit('content', e.target.value, index)}
                variant="outlined"
                label={`Point ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    ) : (
      <>
        <h3 className="font-cormorant text-2xl font-bold mb-6 text-[#1A1A1A]">{title}</h3>
        {isVision ? (
          <p className="text-[#4A4A4A] text-lg leading-relaxed">{content}</p>
        ) : (
          <ul className="space-y-4">
            {content.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <p className="text-[#4A4A4A] text-lg leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    )}
    {isAdmin && (
      <IconButton 
        onClick={() => onEdit('isEditing', !isEditing)}
        className="absolute right-2 top-2"
      >
        {isEditing ? <SaveIcon /> : <EditIcon />}
      </IconButton>
    )}
  </motion.div>
);

const FounderCard = ({ id, name, role, image, email, isEditing, onEdit, isAdmin }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#E8E8E8] transform hover:scale-105 transition-transform duration-300 relative"
  >
    {isEditing ? (
      <div className="space-y-4 p-6">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  onEdit('image', reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full"
          />
        </div>
        <TextField
          fullWidth
          value={name}
          onChange={(e) => onEdit('name', e.target.value)}
          variant="outlined"
          label="Name"
        />
        <TextField
          fullWidth
          value={role}
          onChange={(e) => onEdit('role', e.target.value)}
          variant="outlined"
          label="Role"
        />
        <TextField
          fullWidth
          value={email}
          onChange={(e) => onEdit('email', e.target.value)}
          variant="outlined"
          label="Email"
        />
      </div>
    ) : (
      <>
        <img src={image} alt={name} className="w-full h-72 object-cover" />
        <div className="p-6">
          <h4 className="font-cormorant text-xl font-bold text-[#1A1A1A]">{name}</h4>
          <p className="text-amber-600 text-sm mb-2">{role}</p>
          <a href={`mailto:${email}`} className="text-[#4A4A4A] text-sm hover:text-amber-600">{email}</a>
        </div>
      </>
    )}
    {isAdmin && (
      <IconButton 
        onClick={() => onEdit('isEditing', !isEditing)}
        className="absolute right-2 top-2 bg-white"
      >
        {isEditing ? <SaveIcon /> : <EditIcon />}
      </IconButton>
    )}
  </motion.div>
);

const AboutUs = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [headerData, setHeaderData] = useState({
    title: "Who We Are",
    subtitle: "Elite Law Students from NLSIU, Pioneering Legal Innovation",
    isEditing: false
  })

  const [visionMissionData, setVisionMissionData] = useState({
    vision: {
      title: "Our Vision",
      content: "To become the go-to platform for affordable and reliable legal assistance, empowering lawyers, law students, start-ups, corporations and the wide array of people who reach out to us with high-quality research, insights, and support to excel in their professional, academic and legal pursuits.",
      isEditing: false
    },
    mission: {
      title: "Our Mission",
      content: [
        "Relieve overburdened lawyers by providing meticulous legal research tailored to their needs.",
        "Support law students in achieving academic and professional excellence through guided assistance with reviewing projects, moots, and research.",
        "Offer startups and corporations accessible legal solutions, simplifying complex legal challenges.",
        "Foster legal awareness through educational blogs and approachable consultation services.",
        "Build a trusted, client-centric platform that leverages technology and expertise to deliver exceptional legal support efficiently."
      ],
      isEditing: false
    }
  })

  const [foundersData, setFoundersData] = useState({
    title: "Meet Our Founders",
    isEditing: false,
    founders: [
      {
        id: 1,
        name: "Suyash",
        role: "Co-Founder",
        image: "/images/founder1.jpg",
        email: "suyash@legalplatform.com",
        isEditing: false
      },
      {
        id: 2,
        name: "Ayush",
        role: "Co-Founder",
        image: "/images/founder2.jpg",
        email: "ayush@legalplatform.com",
        isEditing: false
      },
      {
        id: 3,
        name: "Akash",
        role: "Co-Founder",
        image: "/images/founder3.jpg",
        email: "akash@legalplatform.com",
        isEditing: false
      }
    ]
  })

  const [consultationData, setConsultationData] = useState({
    title: "Free Legal Consultation",
    description: "Book a free 25-minute consultation to discuss your legal needs and understand how we can assist you. Our team of NLSIU law students is ready to provide expert guidance tailored to your specific requirements.",
    buttonText: "Schedule Your Free Consultation",
    isEditing: false,
    image: "/images/about-team.jpg"
  })

  const [foundersHeaderData, setFoundersHeaderData] = useState({
    title: "Meet Our Founders",
    isEditing: false
  })

  useEffect(() => {
    const checkAdminStatus = () => {
      const encryptedUser = localStorage.getItem('user')
      if (encryptedUser) {
        try {
          const key = process.env.REACT_APP_ENCRYPTION_KEY
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedUser, key)
          const userString = decryptedBytes.toString(CryptoJS.enc.Utf8)
          const user = JSON.parse(userString)
          setIsAdmin(user.role === 'admin')
        } catch (error) {
          setIsAdmin(false)
        }
      }
    }

    checkAdminStatus()
  }, [])

  const toggleEdit = (section, id = null) => {
    if (!isAdmin) return

    switch (section) {
      case 'header':
        setHeaderData(prev => ({ ...prev, isEditing: !prev.isEditing }))
        break
      case 'vision':
        setVisionMissionData(prev => ({
          ...prev,
          vision: { ...prev.vision, isEditing: !prev.vision.isEditing }
        }))
        break
      case 'mission':
        setVisionMissionData(prev => ({
          ...prev,
          mission: { ...prev.mission, isEditing: !prev.mission.isEditing }
        }))
        break
      case 'founders':
        if (id) {
          setFoundersData(prev => ({
            ...prev,
            founders: prev.founders.map(f =>
              f.id === id ? { ...f, isEditing: !f.isEditing } : f
            )
          }))
        } else {
          setFoundersData(prev => ({ ...prev, isEditing: !prev.isEditing }))
        }
        break
      case 'consultation':
        setConsultationData(prev => ({ ...prev, isEditing: !prev.isEditing }))
        break
      default:
        break
    }
  }

  const handleVisionMissionEdit = (section, field, value, index) => {
    setVisionMissionData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: field === 'content' && Array.isArray(prev[section].content) 
          ? prev[section].content.map((item, i) => i === index ? value : item)
          : value
      }
    }));
  };

  const handleFounderEdit = (id, field, value) => {
    setFoundersData(prev => ({
      ...prev,
      founders: prev.founders.map(founder =>
        founder.id === id ? { ...founder, [field]: value } : founder
      )
    }));
  };

  const toggleFoundersHeaderEdit = () => {
    if (!isAdmin) return;
    setFoundersHeaderData(prev => ({ ...prev, isEditing: !prev.isEditing }));
  };

  const toggleConsultationEdit = () => {
    if (!isAdmin) return;
    setConsultationData(prev => ({ ...prev, isEditing: !prev.isEditing }));
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative"
        >
          {headerData.isEditing ? (
            <div className="space-y-4">
              <TextField
                fullWidth
                value={headerData.title}
                onChange={(e) => setHeaderData(prev => ({ ...prev, title: e.target.value }))}
                variant="outlined"
                label="Title"
              />
              <TextField
                fullWidth
                value={headerData.subtitle}
                onChange={(e) => setHeaderData(prev => ({ ...prev, subtitle: e.target.value }))}
                variant="outlined"
                label="Subtitle"
              />
            </div>
          ) : (
            <>
              <h2 className="font-cormorant text-6xl font-bold text-[#1A1A1A] mb-4">
                {headerData.title}
              </h2>
              <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
              <p className="font-cormorant text-2xl text-[#4A4A4A] max-w-3xl mx-auto">
                {headerData.subtitle}
              </p>
            </>
          )}
          {isAdmin && (
            <IconButton 
              onClick={() => toggleEdit('header')}
              className="absolute right-0 top-0"
            >
              {headerData.isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <VisionMission title="Our Vision" content="To become the go-to platform for affordable and reliable legal assistance, empowering lawyers, law students, start-ups, corporations and the wide array of people who reach out to us with high-quality research, insights, and support to excel in their professional, academic and legal pursuits." isVision={true} isEditing={visionMissionData.vision.isEditing} onEdit={(field, value) => handleVisionMissionEdit('vision', field, value)} isAdmin={isAdmin} />
          <VisionMission title="Our Mission" content={visionMissionData.mission.content} isVision={false} isEditing={visionMissionData.mission.isEditing} onEdit={(field, value, index) => handleVisionMissionEdit('mission', field, value, index)} isAdmin={isAdmin} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          {foundersHeaderData.isEditing ? (
            <div className="space-y-4">
              <TextField
                fullWidth
                value={foundersHeaderData.title}
                onChange={(e) => setFoundersHeaderData({...foundersHeaderData, title: e.target.value})}
                variant="outlined"
                label="Title"
              />
            </div>
          ) : (
            <>
              <h2 className="font-cormorant text-4xl font-bold text-[#1A1A1A] mb-4">
                {foundersHeaderData.title}
              </h2>
              <div className="w-24 h-1 bg-amber-600 mx-auto mb-12"></div>
            </>
          )}
          {isAdmin && (
            <IconButton 
              onClick={toggleFoundersHeaderEdit}
              className="absolute right-0 top-0"
            >
              {foundersHeaderData.isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {foundersData.founders.map((founder, index) => (
              <FounderCard 
                key={index} 
                {...founder} 
                isAdmin={isAdmin}
                isEditing={founder.isEditing}
                onEdit={(field, value) => handleFounderEdit(founder.id, field, value)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-8 shadow-xl border border-[#E8E8E8] transform hover:shadow-2xl transition-shadow duration-300 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {consultationData.isEditing ? (
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setConsultationData(prev => ({...prev, image: reader.result}));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full"
                />
                <img
                  src={consultationData.image}
                  alt="Preview"
                  className="w-full h-[450px] object-cover rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <img
                src={consultationData.image}
                alt="Our Team"
                className="w-full h-[450px] object-cover rounded-lg shadow-lg"
              />
            )}
            <div className="flex flex-col justify-center">
              {consultationData.isEditing ? (
                <div className="space-y-4">
                  <TextField
                    fullWidth
                    value={consultationData.title}
                    onChange={(e) => setConsultationData(prev => ({...prev, title: e.target.value}))}
                    variant="outlined"
                    label="Title"
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={consultationData.description}
                    onChange={(e) => setConsultationData(prev => ({...prev, description: e.target.value}))}
                    variant="outlined"
                    label="Description"
                  />
                  <TextField
                    fullWidth
                    value={consultationData.buttonText}
                    onChange={(e) => setConsultationData(prev => ({...prev, buttonText: e.target.value}))}
                    variant="outlined"
                    label="Button Text"
                  />
                </div>
              ) : (
                <>
                  <h3 className="font-cormorant text-3xl font-bold mb-6 text-[#1A1A1A]">
                    {consultationData.title}
                  </h3>
                  <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8">
                    {consultationData.description}
                  </p>
                  <button className="bg-amber-600 text-white px-10 py-4 rounded-lg hover:bg-amber-700 transition-colors duration-300 w-fit text-lg font-semibold shadow-lg hover:shadow-xl">
                    {consultationData.buttonText}
                  </button>
                </>
              )}
            </div>
          </div>
          {isAdmin && (
            <IconButton 
              onClick={toggleConsultationEdit}
              className="absolute right-2 top-2"
            >
              {consultationData.isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;