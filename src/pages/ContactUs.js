import React, { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { BACKEND_URL } from '../constants'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { IconButton, TextField } from '@mui/material'
import CryptoJS from 'crypto-js'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isAdmin, setIsAdmin] = useState(false)
  const [pageData, setPageData] = useState({
    title: 'Contact Us',
    subtitle: 'Get in touch with our legal experts for personalized assistance and consultation',
    address: 'Gnana Bharathi Main Rd, Naagarabhaavi, Bengaluru, Karnataka 560072',
    phone: '+91 XXXXX XXXXX',
    email: 'info@clausecounselcraft.solutions',
    workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM',
    consultationTitle: 'Free Consultation',
    consultationText: 'Book a free 25-minute consultation with our legal experts to discuss your needs',
    isEditing: false
  })
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

  const fetchPageData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/contact/content`)
      const { contactInfo, titleSubtitle } = await response.json()
      if (contactInfo && titleSubtitle) {
        setPageData({
          title: titleSubtitle.title,
          subtitle: titleSubtitle.subtitle,
          address: contactInfo.address,
          phone: contactInfo.phone,
          email: contactInfo.email,
          workingHours: contactInfo.workingHours,
          consultationTitle: 'Free Consultation',
          consultationText: 'Book a free 25-minute consultation with our legal experts to discuss your needs',
          isEditing: false
        })
      }
    } catch (error) {
      console.error('Error fetching contact page data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPageData()
    checkAdminStatus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${BACKEND_URL}/api/contact/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Failed to send message');
        alert('Message sent successfully');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const toggleEdit = async () => {
    if (!isAdmin) return
    if (pageData.isEditing) {
      try {
        const encryptedTokens = localStorage.getItem('tokens')
        const key = process.env.REACT_APP_ENCRYPTION_KEY
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedTokens, key)
        const { accessToken } = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))

        const response = await fetch(`${BACKEND_URL}/api/contact`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(pageData)
        })
        if (!response.ok) throw new Error('Failed to update contact page')
        fetchPageData()
      } catch (error) {
        console.error('Error updating contact page:', error)
      }
    }
    setPageData(prev => ({ ...prev, isEditing: !prev.isEditing }))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[40vh] bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="w-full relative z-10">
          <div className="text-center">
            {pageData.isEditing ? (
              <>
                <TextField
                  fullWidth
                  value={pageData.title}
                  onChange={(e) => setPageData({...pageData, title: e.target.value})}
                  variant="outlined"
                  label="Title"
                  className="text-white mb-4"
                  InputProps={{
                    className: "text-white"
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={pageData.subtitle}
                  onChange={(e) => setPageData({...pageData, subtitle: e.target.value})}
                  variant="outlined"
                  label="Subtitle"
                  className="text-white"
                  InputProps={{
                    className: "text-white"
                  }}
                />
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl text-white font-serif mb-2">{pageData.title}</h1>
                <p className="text-white text-lg max-w-2xl mx-auto px-4">{pageData.subtitle}</p>
              </>
            )}
            {isAdmin && (
              <IconButton 
                onClick={toggleEdit}
                className="absolute right-4 top-4 text-white"
              >
                {pageData.isEditing ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-serif text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 relative">
              <h3 className="text-2xl font-serif text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    {pageData.isEditing ? (
                      <TextField
                        fullWidth
                        value={pageData.address}
                        onChange={(e) => setPageData({...pageData, address: e.target.value})}
                        variant="outlined"
                        label="Address"
                      />
                    ) : (
                      <p className="text-gray-600 mt-1">{pageData.address}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    {pageData.isEditing ? (
                      <TextField
                        fullWidth
                        value={pageData.phone}
                        onChange={(e) => setPageData({...pageData, phone: e.target.value})}
                        variant="outlined"
                        label="Phone"
                      />
                    ) : (
                      <p className="text-gray-600 mt-1">{pageData.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    {pageData.isEditing ? (
                      <TextField
                        fullWidth
                        value={pageData.email}
                        onChange={(e) => setPageData({...pageData, email: e.target.value})}
                        variant="outlined"
                        label="Email"
                      />
                    ) : (
                      <p className="text-gray-600 mt-1">{pageData.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Working Hours</h4>
                    {pageData.isEditing ? (
                      <TextField
                        fullWidth
                        value={pageData.workingHours}
                        onChange={(e) => setPageData({...pageData, workingHours: e.target.value})}
                        variant="outlined"
                        label="Working Hours"
                      />
                    ) : (
                      <p className="text-gray-600 mt-1">{pageData.workingHours}</p>
                    )}
                  </div>
                </div>
              </div>
              {isAdmin && (
                <IconButton 
                  onClick={toggleEdit}
                  className="absolute right-2 top-2"
                >
                  {pageData.isEditing ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 relative">
              {pageData.isEditing ? (
                <TextField
                  fullWidth
                  value={pageData.consultationTitle}
                  onChange={(e) => setPageData({...pageData, consultationTitle: e.target.value})}
                  variant="outlined"
                  label="Consultation Title"
                />
              ) : (
                <h3 className="text-2xl font-serif text-gray-900 mb-6">{pageData.consultationTitle}</h3>
              )}
              {pageData.isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={pageData.consultationText}
                  onChange={(e) => setPageData({...pageData, consultationText: e.target.value})}
                  variant="outlined"
                  label="Consultation Text"
                />
              ) : (
                <p className="text-gray-600 mb-6">{pageData.consultationText}</p>
              )}
              <button
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Schedule Now
              </button>
              {isAdmin && (
                <IconButton 
                  onClick={toggleEdit}
                  className="absolute right-2 top-2"
                >
                  {pageData.isEditing ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs