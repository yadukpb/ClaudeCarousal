import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import CryptoJS from 'crypto-js'
import { BACKEND_URL } from '../constants'

const PrivacyPolicy = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [headerData, setHeaderData] = useState({
    title: "Privacy Policy",
    isEditing: false
  })

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Information We Collect",
      content: "We collect information you provide directly to us when you fill out forms, create an account, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.",
      isEditing: false
    },
    {
      id: 2,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide our services, communicate with you, improve our services, and comply with legal obligations.",
      isEditing: false
    }
  ])

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

  const handleSectionEdit = (id, field, value) => {
    setSections(prev => prev.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ))
  }

  const addNewSection = () => {
    const newSection = {
      id: Date.now(),
      title: "New Section",
      content: "Enter content here",
      isEditing: true
    }
    setSections(prev => [...prev, newSection])
  }

  const deleteSection = (id) => {
    setSections(prev => prev.filter(section => section.id !== id))
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center relative"
        >
          {headerData.isEditing ? (
            <TextField
              fullWidth
              value={headerData.title}
              onChange={(e) => setHeaderData({...headerData, title: e.target.value})}
              variant="outlined"
              label="Title"
            />
          ) : (
            <>
              <h1 className="font-cormorant text-5xl sm:text-6xl font-bold text-[#1A1A1A] mb-4">{headerData.title}</h1>
              <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            </>
          )}
          {isAdmin && (
            <IconButton 
              onClick={() => setHeaderData(prev => ({...prev, isEditing: !prev.isEditing}))}
              className="absolute right-0 top-0"
            >
              {headerData.isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-lg space-y-8"
        >
          {sections.map((section) => (
            <section key={section.id} className="transform hover:scale-[1.01] transition-transform duration-300 relative">
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
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">{section.title}</h2>
                  <p className="text-[#4A4A4A] leading-relaxed">{section.content}</p>
                </>
              )}
              {isAdmin && (
                <div className="absolute right-2 top-2 flex gap-2">
                  <IconButton onClick={() => handleSectionEdit(section.id, 'isEditing', !section.isEditing)}>
                    {section.isEditing ? <SaveIcon /> : <EditIcon />}
                  </IconButton>
                  <IconButton onClick={() => deleteSection(section.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </section>
          ))}
          {isAdmin && (
            <div className="flex justify-center mt-8">
              <IconButton 
                onClick={addNewSection}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <AddIcon />
              </IconButton>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy