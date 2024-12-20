import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CryptoJS from 'crypto-js'
import { BACKEND_URL } from '../constants'
import StickyContact from '../components/StickyContact'

const VisionMission = ({ title, content, isVision, isEditing, onEdit, isAdmin }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-white rounded-xl p-4 md:p-6 shadow-lg border border-[#E8E8E8] relative ${
      isVision ? 'h-auto' : 'h-auto'
    } transition-all duration-300 hover:shadow-xl`}
  >
    {isEditing ? (
      <div className="space-y-6">
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
            rows={6}
            value={content}
            onChange={(e) => onEdit('content', e.target.value)}
            variant="outlined"
            label="Content"
          />
        ) : (
          <div className="space-y-6">
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
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => onEdit('content', [...content, ''], 'add')}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Point
              </button>
              {content.length > 1 && (
                <button
                  onClick={() => onEdit('content', content.slice(0, -1), 'remove')}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove Point
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    ) : (
      <>
        <h3 className="font-cormorant text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">{title}</h3>
        {isVision ? (
          <p className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed">{content}</p>
        ) : (
          <ul className="space-y-6">
            {content.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="text-amber-600 font-bold text-2xl mt-1">•</span>
                <p className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    )}
    {isAdmin && (
      <IconButton 
        onClick={() => onEdit('isEditing', !isEditing)}
        className="absolute right-4 top-4 bg-white/80 hover:bg-white shadow-md"
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
    className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#E8E8E8] transform hover:scale-105 transition-all duration-300 hover:shadow-xl relative"
  >
    {isEditing ? (
      <div className="space-y-6 p-8">
        <div className="mb-6">
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
            className="w-full p-2 border rounded-lg"
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
        <div className="aspect-w-4 aspect-h-3">
          <img src={image} alt={name} className="w-full h-80 object-cover" />
        </div>
        <div className="p-8">
          <h4 className="font-cormorant text-2xl font-bold text-[#1A1A1A] mb-2">{name}</h4>
          <p className="text-amber-600 text-lg mb-4">{role}</p>
          <a 
            href={`mailto:${email}`} 
            className="text-[#4A4A4A] text-lg hover:text-amber-600 transition-colors"
          >
            {email}
          </a>
        </div>
      </>
    )}
    {isAdmin && (
      <IconButton 
        onClick={() => onEdit('isEditing', !isEditing)}
        className="absolute right-4 top-4 bg-white/80 hover:bg-white shadow-md"
      >
        {isEditing ? <SaveIcon /> : <EditIcon />}
      </IconButton>
    )}
  </motion.div>
);

const AboutUs = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [aboutUsData, setAboutUsData] = useState(null)

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

  const fetchAboutUsData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/about/content`)
      if (!response.ok) throw new Error('Failed to fetch About Us data')
      const data = await response.json()
      setAboutUsData(data)
    } catch (error) {
      console.error('Error fetching About Us data:', error)
    }
  }

  const handleEdit = (field, value, index) => {
    if (index !== undefined) {
      setAboutUsData((prevData) => {
        const updatedContent = [...prevData.mission.content];
        updatedContent[index] = value;
        return {
          ...prevData,
          mission: {
            ...prevData.mission,
            content: updatedContent,
          },
        };
      });
    } else {
      setAboutUsData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  }

  useEffect(() => {
    fetchAboutUsData()
    checkAdminStatus()
  }, [])

  if (!aboutUsData) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-2xl text-[#4A4A4A]">Loading...</div>
    </div>
  )

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        <header className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="font-cormorant text-6xl md:text-7xl font-bold text-[#1A1A1A] mb-6">
            {aboutUsData.header.title}
          </h1>
          <p className="font-cormorant text-2xl md:text-3xl text-[#4A4A4A]">
            {aboutUsData.header.subtitle}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <VisionMission 
            title={aboutUsData.vision.title}
            content={aboutUsData.vision.content}
            isVision={true}
            isEditing={aboutUsData.vision.isEditing}
            onEdit={handleEdit}
            isAdmin={isAdmin}
          />
          <VisionMission
            title={aboutUsData.mission.title}
            content={aboutUsData.mission.content}
            isVision={false}
            isEditing={aboutUsData.mission.isEditing}
            onEdit={handleEdit}
            isAdmin={isAdmin}
          />
        </div>

        <section className="mb-20">
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-12 text-center">
            {aboutUsData.foundersHeader.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {aboutUsData.founders.map((founder, index) => (
              <FounderCard 
                key={index} 
                {...founder} 
                isAdmin={isAdmin}
                isEditing={founder.isEditing}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl p-8 md:p-12 shadow-xl border border-[#E8E8E8] max-w-4xl mx-auto">
          <h3 className="font-cormorant text-3xl md:text-4xl font-bold mb-8 text-[#1A1A1A]">
            {aboutUsData.consultation.title}
          </h3>
          <p className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed">
            {aboutUsData.consultation.description}
          </p>
          <div className="flex justify-center mt-4">
            <button className="bg-green-500 text-white px-8 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Schedule a Meeting
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;