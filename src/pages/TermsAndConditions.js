import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CryptoJS from 'crypto-js'
import { BACKEND_URL } from '../constants'

const TermsAndConditions = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [headerData, setHeaderData] = useState({
    title: "Legal Agreement",
    heading: "Terms and Conditions",
    subtitle: "Please read these terms carefully before using our services.",
    isEditing: false
  })

  const [sections, setSections] = useState([
    {
      id: 1,
      icon: "gavel",
      title: "Acceptance of Terms",
      content: "By accessing and using ClauseCraft Counsel's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
      isEditing: false
    },
    {
      id: 2,
      icon: "description",
      title: "Services Description",
      content: "We provide legal research, academic support, and corporate legal services. Our services are delivered by NLSIU law students under appropriate supervision.",
      isEditing: false
    },
    {
      id: 3,
      icon: "account_circle",
      title: "User Obligations",
      content: "Users must provide accurate information, maintain confidentiality of their account credentials, and use our services in compliance with applicable laws.",
      isEditing: false
    },
    {
      id: 4,
      icon: "copyright",
      title: "Intellectual Property",
      content: "All content and materials available through our services are protected by intellectual property rights and remain the property of ClauseCraft Counsel.",
      isEditing: false
    },
    {
      id: 5,
      icon: "security",
      title: "Limitation of Liability",
      content: "Our services are provided \"as is\" without warranties. We shall not be liable for any indirect, incidental, special, or consequential damages.",
      isEditing: false
    },
    {
      id: 6,
      icon: "lock",
      title: "Confidentiality",
      content: "We maintain strict confidentiality of all client information and communications in accordance with legal professional standards.",
      isEditing: false
    },
    {
      id: 7,
      icon: "contact_support",
      title: "Contact Information",
      content: "For questions about these terms, please contact us at legal@clausecounselcraft.solutions",
      isEditing: false
    }
  ])

  useEffect(() => {
    const checkAdminStatus = () => {
      const userData = localStorage.getItem('userData')
      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData)
          setIsAdmin(parsedUserData.user.role === 'admin')
        } catch (error) {
          setIsAdmin(false)
        }
      }
    }
    checkAdminStatus()
  }, [])

  const handleSectionEdit = (id, field, value) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    )
  }

  const toggleHeaderEdit = () => {
    if (!isAdmin) return
    setHeaderData(prev => ({ ...prev, isEditing: !prev.isEditing }))
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-3">Legal Agreement</h2>
          <h1 className="font-cormorant text-5xl sm:text-6xl font-bold text-[#1A1A1A] mb-4">Terms and Conditions</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto">Please read these terms carefully before using our services.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-lg space-y-8"
        >
          {sections.map((section, index) => (
            <section key={index} className="transform hover:scale-[1.01] transition-transform duration-300 relative">
              {section.isEditing ? (
                <div className="space-y-4">
                  <TextField
                    fullWidth
                    value={section.title}
                    onChange={(e) => handleSectionEdit(section.id, 'title', e.target.value)}
                    variant="outlined"
                    label="Title"
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={section.content}
                    onChange={(e) => handleSectionEdit(section.id, 'content', e.target.value)}
                    variant="outlined"
                    label="Content"
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-amber-600">{section.icon}</span>
                    </div>
                    <h2 className="font-cormorant text-3xl font-bold text-[#1A1A1A]">{section.title}</h2>
                  </div>
                  <p className="text-[#4A4A4A] leading-relaxed text-lg pl-16">{section.content}</p>
                </>
              )}
              {isAdmin && (
                <IconButton 
                  onClick={() => handleSectionEdit(section.id, 'isEditing', !section.isEditing)}
                  className="absolute right-2 top-2"
                >
                  {section.isEditing ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              )}
            </section>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default TermsAndConditions