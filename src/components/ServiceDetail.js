import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

const ServiceDetail = ({ service, onClose }) => {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  const serviceData = {
    title: service.title,
    subtitle: service.description,
    description: `Professional ${service.title} services tailored to your specific needs. Our expert team ensures comprehensive solutions with attention to detail and compliance with legal requirements.`,
    documentsNeeded: [
      "Valid ID Proof",
      "Business Registration Documents",
      "Tax Registration Details",
      "Previous Legal Documents",
      "Relevant Correspondence",
      "Supporting Evidence",
      "Authorization Letters",
      "Power of Attorney (if applicable)"
    ],
    whyChooseUs: [
      "Expert Legal Team",
      "Customized Solutions",
      "Timely Delivery",
      "Competitive Pricing",
      "Comprehensive Support",
      "Confidentiality Assured"
    ],
    faqs: [
      {
        question: `What is the typical timeline for ${service.title}?`,
        answer: "Timeline varies based on complexity, typically 2-4 weeks for standard cases."
      },
      {
        question: "What is included in the service?",
        answer: "Our service includes initial consultation, document preparation, legal review, and implementation support."
      },
      {
        question: "How do you ensure quality?",
        answer: "We follow a rigorous review process and maintain strict quality standards throughout the service delivery."
      },
      {
        question: "What are the payment terms?",
        answer: "We offer flexible payment plans with an initial retainer and milestone-based payments."
      }
    ],
    pricing: {
      basic: {
        price: "₹15,000",
        features: [
          "Initial Consultation",
          "Basic Documentation",
          "Standard Processing"
        ]
      },
      standard: {
        price: "₹25,000",
        features: [
          "All Basic Features",
          "Priority Processing",
          "3 Month Support",
          "Detailed Analysis"
        ]
      },
      premium: {
        price: "₹40,000",
        features: [
          "All Standard Features",
          "Express Processing",
          "6 Month Support",
          "Dedicated Manager",
          "Quarterly Review"
        ]
      }
    }
  }

  const handleScheduleMeeting = () => {
    navigate('/schedule-consultation')
    onClose()
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative max-h-[90vh] overflow-y-auto bg-gray-50 p-6 scrollbar-hide rounded-[40px]"
    >
      <IconButton
        onClick={onClose}
        className="absolute right-12 top-8 z-10 bg-white shadow-md hover:bg-gray-100"
        sx={{ 
          color: '#1A1A1A',
          width: '48px',
          height: '48px',
          '&:hover': {
            backgroundColor: '#f3f4f6',
            transform: 'scale(1.05)'
          },
          transition: 'all 0.2s ease-in-out'
        }}
      >
        <CloseIcon />
      </IconButton>

      <div className="sticky top-0 z-10 bg-gray-50 pt-4 pb-6 mb-8">
        <div className="text-center">
          <h1 className="font-cormorant text-5xl sm:text-6xl font-bold text-[#1A1A1A] mb-3">
            {serviceData.title}
          </h1>
          <p className="font-cormorant text-2xl sm:text-3xl text-[#B8860B]">
            {serviceData.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-lg text-[#4A4A4A] leading-relaxed">{serviceData.description}</p>
            </div>
            <div className="lg:col-span-1">
              <Button
                variant="contained"
                fullWidth
                onClick={handleScheduleMeeting}
                sx={{
                  py: 2.5,
                  bgcolor: '#B8860B',
                  fontSize: '1.2rem',
                  borderRadius: '16px',
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(184, 134, 11, 0.25)',
                  '&:hover': { 
                    bgcolor: '#986f0a',
                    boxShadow: '0 6px 20px rgba(184, 134, 11, 0.35)'
                  }
                }}
              >
                Schedule a Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {Object.entries(serviceData.pricing).map(([plan, details]) => (
          <div key={plan} className="bg-white rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="font-cormorant text-2xl font-bold capitalize mb-4 text-center">
              {plan} Plan
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
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="font-cormorant text-2xl font-bold mb-6">Required Documents</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceData.documentsNeeded.map((doc, index) => (
              <li key={index} className="flex items-center p-3 bg-gray-50 rounded-xl">
                <span className="material-symbols-outlined mr-3 text-[#B8860B]">description</span>
                {doc}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="font-cormorant text-2xl font-bold mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 gap-4">
            {serviceData.whyChooseUs.map((reason, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-xl">
                <span className="material-symbols-outlined mr-3 text-[#B8860B]">check_circle</span>
                {reason}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <h2 className="font-cormorant text-2xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        {serviceData.faqs.map((faq, index) => (
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
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ backgroundColor: 'rgba(184, 134, 11, 0.03)' }}
            >
              <Typography className="font-semibold">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-[#4A4A4A]">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </motion.div>
  )
}

export default ServiceDetail