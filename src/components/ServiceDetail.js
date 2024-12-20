import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, TextField } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../constants'

const ServiceDetail = ({ serviceId, onClose, isAdmin }) => {
  const [service, setService] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  const [serviceData, setServiceData] = useState({
    title: '',
    subtitle: '',
    isEditing: false
  })

  const [editableData, setEditableData] = useState({
    documentsNeeded: [],
    whyChooseUs: [],
    faqs: [],
    pricing: {
      basic: {
        title: 'Basic Plan',
        price: '₹15,000',
        features: [],
        isEditing: false
      },
      standard: {
        title: 'Standard Plan',
        price: '₹25,000',
        features: [],
        isEditing: false
      },
      premium: {
        title: 'Premium Plan',
        price: '₹40,000',
        features: [],
        isEditing: false
      }
    },
    isDescriptionEditing: false,
    isDocumentsEditing: false,
    isWhyChooseUsEditing: false
  })

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/serviceview/${serviceId}`)
        const data = await response.json()
        setService(data)
        setServiceData({
          title: data.details.title,
          subtitle: data.details.subtitle,
          isEditing: false,
        })
        setEditableData({
          documentsNeeded: data.details.documentsNeeded || [],
          whyChooseUs: data.details.whyChooseUs || [],
          faqs: data.details.faqs || [],
          pricing: data.details.pricing || {
            basic: { title: 'Basic Plan', price: '₹15,000', features: [] },
            standard: { title: 'Standard Plan', price: '₹25,000', features: [] },
            premium: { title: 'Premium Plan', price: '₹40,000', features: [] },
          },
          isDescriptionEditing: false,
          isDocumentsEditing: false,
          isWhyChooseUsEditing: false,
        })
      } catch (error) {
        console.error('Error fetching service details:', error)
      }
    }

    if (serviceId) {
      fetchServiceDetails()
    }
  }, [serviceId])

  const updateServiceDetails = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/serviceview/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ details: { ...serviceData, ...editableData } }),
      });
      const data = await response.json();
      if (response.ok) {
        setService(data);
        setServiceData({ ...serviceData, isEditing: false });
        setEditableData({ ...editableData });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating service details:', error);
    }
  };

  const toggleServiceEdit = () => {
    if (!isAdmin) return;
    if (serviceData.isEditing) {
      updateServiceDetails();
    } else {
      setServiceData(prev => ({ ...prev, isEditing: !prev.isEditing }));
    }
  };

  const updateServiceData = (field, value) => {
    setServiceData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleScheduleMeeting = () => {
    navigate('/schedule-consultation')
    onClose()
  }

  const toggleEdit = (field) => {
    setEditableData(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const toggleFaqEdit = (index) => {
    setEditableData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, isEditing: !faq.isEditing } : faq
      )
    }))
  }

  const togglePricingEdit = (plan) => {
    setEditableData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [plan]: {
          ...prev.pricing[plan],
          isEditing: !prev.pricing[plan].isEditing
        }
      }
    }))
  }

  const updateFaq = (index, field, value) => {
    setEditableData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }))
  }

  const updatePricing = (plan, field, value) => {
    setEditableData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [plan]: {
          ...prev.pricing[plan],
          [field]: value
        }
      }
    }))
  }

  const addFaq = () => {
    setEditableData(prev => ({
      ...prev,
      faqs: [...prev.faqs, {
        question: "New Question",
        answer: "New Answer",
        isEditing: true
      }]
    }))
  }

  const removeFaq = (index) => {
    setEditableData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }))
  }

  const addPricingFeature = (plan) => {
    setEditableData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [plan]: {
          ...prev.pricing[plan],
          features: [...prev.pricing[plan].features, "New Feature"]
        }
      }
    }))
  }

  const removePricingFeature = (plan, index) => {
    setEditableData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [plan]: {
          ...prev.pricing[plan],
          features: prev.pricing[plan].features.filter((_, i) => i !== index)
        }
      }
    }))
  }

  const updatePricingTitle = (plan, value) => {
    setEditableData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [plan]: {
          ...prev.pricing[plan],
          title: value
        }
      }
    }))
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative max-h-[90vh] overflow-y-auto bg-gray-50 rounded-[40px]"
    >
      {service ? (
        <div className="motion-div h-full overflow-y-auto">
          <div className="sticky top-16 z-10 bg-gray-50 pt-4 pb-4 mb-8">
            <div className="text-center px-4">
              {serviceData.isEditing ? (
                <div className="space-y-4">
                  <TextField
                    fullWidth
                    value={serviceData.title}
                    onChange={(e) => updateServiceData('title', e.target.value)}
                    variant="outlined"
                    label="Service Title"
                  />
                  <TextField
                    fullWidth
                    value={serviceData.subtitle}
                    onChange={(e) => updateServiceData('subtitle', e.target.value)}
                    variant="outlined"
                    label="Service Subtitle"
                  />
                  {isAdmin && (
                    <IconButton onClick={toggleServiceEdit} className="absolute right-4 top-4">
                      <SaveIcon />
                    </IconButton>
                  )}
                </div>
              ) : (
                <>
                  <h1 className="font-cormorant text-5xl sm:text-6xl font-bold text-[#1A1A1A] mb-3">
                    {serviceData.title}
                  </h1>
                  <p className="font-cormorant text-2xl sm:text-3xl text-[#B8860B] mb-4">
                    {serviceData.subtitle}
                  </p>
                  {isAdmin && (
                    <IconButton onClick={toggleServiceEdit} className="absolute right-4 top-4">
                      <EditIcon />
                    </IconButton>
                  )}
                </>
              )}
            </div>
            
           
            
            <div className="w-full max-w-3xl mx-auto mt-4 px-4">
              <Button
                onClick={handleScheduleMeeting}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#B8860B',
                  color: 'white',
                  padding: '16px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  borderRadius: '16px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#986f0a',
                    transform: 'scale(1.02)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Schedule a Free 25 Min Session
              </Button>
            </div>
          </div>

          <div className="px-4">
            <div className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {Object.entries(editableData.pricing).map(([plan, details]) => (
                  <div key={plan} className="bg-white rounded-3xl p-6 shadow-xl relative">
                    {details.isEditing ? (
                      <div className="space-y-4">
                        <TextField
                          fullWidth
                          label="Plan Title"
                          value={details.title || plan}
                          onChange={(e) => updatePricingTitle(plan, e.target.value)}
                        />
                        <TextField
                          fullWidth
                          label="Price"
                          value={details.price}
                          onChange={(e) => updatePricing(plan, 'price', e.target.value)}
                        />
                        {details.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <TextField
                              fullWidth
                              label={`Feature ${idx + 1}`}
                              value={feature}
                              onChange={(e) => updatePricing(plan, 'features', details.features.map((f, i) => i === idx ? e.target.value : f))}
                            />
                            <IconButton onClick={() => removePricingFeature(plan, idx)} color="error">
                              <span className="material-symbols-outlined">delete</span>
                            </IconButton>
                          </div>
                        ))}
                        {isAdmin && (
                          <div className="flex justify-between mt-4">
                            <IconButton onClick={() => addPricingFeature(plan)} color="primary">
                              <span className="material-symbols-outlined">add_circle</span>
                            </IconButton>
                            <IconButton onClick={() => togglePricingEdit(plan)}><SaveIcon /></IconButton>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <h3 className="font-cormorant text-2xl font-bold capitalize mb-4 text-center">
                          {details.title || `${plan} Plan`}
                        </h3>
                        <div className="text-center mb-6">
                          <span className="text-3xl font-bold text-[#B8860B]">{details.price}</span>
                        </div>
                        <ul className="space-y-3">
                          {details.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-base">
                              <span className="material-symbols-outlined mr-3 text-[#B8860B]">done</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        {isAdmin && <IconButton onClick={() => togglePricingEdit(plan)} className="absolute right-2 top-2"><EditIcon /></IconButton>}
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl mb-8 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-cormorant text-2xl font-bold">
                    Frequently Asked Questions
                  </h2>
                  {isAdmin && (
                    <IconButton onClick={addFaq} color="primary">
                      <span className="material-symbols-outlined">add_circle</span>
                    </IconButton>
                  )}
                </div>
                {editableData.faqs.map((faq, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === index}
                    onChange={() => setExpanded(expanded === index ? false : index)}
                    sx={{ 
                      mb: 2, 
                      '&:before': { display: 'none' },
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: 'none',
                      border: '1px solid #eee'
                    }}
                  >
                    {faq.isEditing ? (
                      <div className="p-4 space-y-4">
                        <TextField
                          fullWidth
                          label="Question"
                          value={faq.question}
                          onChange={(e) => updateFaq(index, 'question', e.target.value)}
                        />
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Answer"
                          value={faq.answer}
                          onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                        />
                        <div className="flex justify-between">
                          <IconButton onClick={() => removeFaq(index)} color="error">
                            <span className="material-symbols-outlined">delete</span>
                          </IconButton>
                          <IconButton onClick={() => toggleFaqEdit(index)}><SaveIcon /></IconButton>
                        </div>
                      </div>
                    ) : (
                      <>
                        <AccordionSummary 
                          expandIcon={<ExpandMoreIcon />}
                          sx={{ backgroundColor: 'rgba(184, 134, 11, 0.03)' }}
                        >
                          <Typography className="font-semibold">{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography className="text-[#4A4A4A]">{faq.answer}</Typography>
                        </AccordionDetails>
                        {isAdmin && (
                          <div className="absolute right-2 top-2 flex">
                            <IconButton onClick={() => removeFaq(index)} color="error">
                              <span className="material-symbols-outlined">delete</span>
                            </IconButton>
                            <IconButton onClick={() => toggleFaqEdit(index)}><EditIcon /></IconButton>
                          </div>
                        )}
                      </>
                    )}
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="material-symbols-outlined animate-spin text-4xl text-[#B8860B]">
            hourglass_empty
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default ServiceDetail