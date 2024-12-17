import React, { useState, useRef, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { IconButton, TextField } from '@mui/material'
import CryptoJS from 'crypto-js'
import { BACKEND_URL } from '../constants'

const FAQItem = ({ question, answer, isOpen, onClick, category, isEditing, onEdit, isAdmin }) => {
  const contentRef = useRef(null)

  return (
    <div className="transform transition-all duration-300 hover:scale-[1.01] relative">
      {isEditing ? (
        <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-100">
          <TextField
            fullWidth
            value={question}
            onChange={(e) => onEdit('question', e.target.value)}
            variant="outlined"
            label="Question"
          />
          <TextField
            fullWidth
            value={category}
            onChange={(e) => onEdit('category', e.target.value)}
            variant="outlined"
            label="Category"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            value={answer}
            onChange={(e) => onEdit('answer', e.target.value)}
            variant="outlined"
            label="Answer"
          />
        </div>
      ) : (
        <>
          <button
            className={`w-full text-left p-6 flex justify-between items-center rounded-t-lg shadow-sm border ${
              isOpen 
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border-amber-400' 
                : 'bg-white hover:bg-amber-50 border-gray-100 rounded-lg'
            }`}
            onClick={onClick}
            aria-expanded={isOpen}
            aria-controls={`faq-${question.replace(/\s+/g, '-')}`}
          >
            <div>
              <span className="font-semibold text-lg">{question}</span>
              <span className="text-sm block mt-1 opacity-80">{category}</span>
            </div>
            {isOpen ? (
              <Minus className="w-6 h-6 flex-shrink-0" />
            ) : (
              <Plus className="w-6 h-6 flex-shrink-0" />
            )}
          </button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div 
                  ref={contentRef}
                  id={`faq-${question.replace(/\s+/g, '-')}`}
                  className="p-6 bg-white border border-t-0 rounded-b-lg shadow-sm"
                >
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-700 leading-relaxed"
                  >
                    {answer}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1)
  const [isAdmin, setIsAdmin] = useState(false)
  const [headerData, setHeaderData] = useState({
    title: "FAQ",
    heading: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about legal services and business formation.",
    isEditing: false
  })
  const [faqData, setFaqData] = useState([])
  const [loading, setLoading] = useState(true)

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

  const fetchFAQData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/faq`)
      const { data } = await response.json()
      if (data) {
        setHeaderData({
          ...headerData,
          ...data.header,
          isEditing: false
        })
        setFaqData(data.faqs.map(faq => ({
          ...faq,
          isEditing: false
        })))
      }
    } catch (error) {
      console.error('Error fetching FAQ data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFAQData()
    checkAdminStatus()
  }, [])

  const handleFAQEdit = async (id, field, value) => {
    if (field === 'isEditing') {
      setFaqData(prevData =>
        prevData.map(faq =>
          faq._id === id ? { ...faq, [field]: value } : faq
        )
      )
      if (!value) {
        const faq = faqData.find(f => f._id === id)
        try {
          const encryptedTokens = localStorage.getItem('tokens')
          const key = process.env.REACT_APP_ENCRYPTION_KEY
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedTokens, key)
          const { accessToken } = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))

          const response = await fetch(`${BACKEND_URL}/api/faq/item/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              question: faq.question,
              answer: faq.answer,
              category: faq.category
            })
          })
          if (!response.ok) throw new Error('Failed to update FAQ')
          fetchFAQData()
        } catch (error) {
          console.error('Error updating FAQ:', error)
        }
      }
    } else {
      setFaqData(prevData =>
        prevData.map(faq =>
          faq._id === id ? { ...faq, [field]: value } : faq
        )
      )
    }
  }

  const toggleHeaderEdit = async () => {
    if (!isAdmin) return
    if (headerData.isEditing) {
      try {
        const encryptedTokens = localStorage.getItem('tokens')
        const key = process.env.REACT_APP_ENCRYPTION_KEY
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedTokens, key)
        const { accessToken } = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))

        const response = await fetch(`${BACKEND_URL}/api/faq/header`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            title: headerData.title,
            heading: headerData.heading,
            subtitle: headerData.subtitle
          })
        })
        if (!response.ok) throw new Error('Failed to update header')
        fetchFAQData()
      } catch (error) {
        console.error('Error updating header:', error)
      }
    }
    setHeaderData(prev => ({ ...prev, isEditing: !prev.isEditing }))
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-gray-50">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:gap-16 items-start">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="mb-8 lg:mb-12 relative">
              {headerData.isEditing ? (
                <div className="space-y-4">
                  <TextField
                    fullWidth
                    value={headerData.title}
                    onChange={(e) => setHeaderData({...headerData, title: e.target.value})}
                    variant="outlined"
                    label="Title"
                  />
                  <TextField
                    fullWidth
                    value={headerData.heading}
                    onChange={(e) => setHeaderData({...headerData, heading: e.target.value})}
                    variant="outlined"
                    label="Heading"
                  />
                  <TextField
                    fullWidth
                    value={headerData.subtitle}
                    onChange={(e) => setHeaderData({...headerData, subtitle: e.target.value})}
                    variant="outlined"
                    label="Subtitle"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-3">{headerData.title}</h2>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-gray-900">{headerData.heading}</h1>
                  <p className="text-gray-600 text-base lg:text-lg mb-6 lg:mb-8">{headerData.subtitle}</p>
                </>
              )}
              {isAdmin && (
                <IconButton 
                  onClick={toggleHeaderEdit}
                  className="absolute right-0 top-0"
                >
                  {headerData.isEditing ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              )}
            </div>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <FAQItem
                  key={faq._id}
                  question={faq.question}
                  answer={faq.answer}
                  category={faq.category}
                  isOpen={index === openIndex}
                  onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                  isEditing={faq.isEditing}
                  onEdit={(field, value) => handleFAQEdit(faq._id, field, value)}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:sticky lg:top-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://shtheme.org/demosd/mcgill/wp-content/uploads/2021/11/about.jpg"
                alt="FAQ illustration"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FAQ