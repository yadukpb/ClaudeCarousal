import React, { useState, useRef } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQItem = ({ question, answer, isOpen, onClick, category }) => {
  const contentRef = useRef(null)

  return (
    <div className="transform transition-all duration-300 hover:scale-[1.01]">
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
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1)

  const faqData = [
    {
      question: "What services do you provide for lawyers?",
      answer: "We provide comprehensive legal research services, document drafting including pleadings and affidavits, case law summaries, precedent development, and customized legal updates. Our team from NLSIU offers focused research solutions to help lawyers manage their workload efficiently.",
      category: "Services"
    },
    {
      question: "How can you assist law students?",
      answer: "We offer project review services, moot court preparation assistance, thesis guidance, and research support. While we don't complete assignments, we provide valuable feedback and guidance to help students improve their work quality and research skills.",
      category: "Academic Support"
    },
    {
      question: "What is included in your free consultation?",
      answer: "Our free 25-minute consultation allows you to discuss your legal needs, understand our services better, and explore how we can assist you. This session can be scheduled through our online booking system for a virtual meeting.",
      category: "Consultation"
    },
    {
      question: "How do you support startups and corporations?",
      answer: "We offer business structuring advice, contract drafting and review, lease agreement assistance, employment contract preparation, and e-commerce legal compliance support. Our services are designed to provide practical legal solutions for growing businesses.",
      category: "Business Services"
    },
    {
      question: "What makes LegalEase Solutions unique?",
      answer: "As NLSIU law students, we combine academic excellence with practical legal knowledge to provide high-quality, affordable legal assistance. Our platform specializes in thorough legal research, academic support, and corporate legal services with a client-centric approach.",
      category: "About Us"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-gray-50">
      <div className="flex flex-col lg:flex-row lg:gap-16 items-start">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-3">FAQ</h2>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-gray-900">Frequently Asked Questions</h1>
            <p className="text-gray-600 text-base lg:text-lg mb-6 lg:mb-8">Find answers to common questions about legal services and business formation.</p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                category={faq.category}
                isOpen={index === openIndex}
                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
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
    </div>
  )
}

export default FAQ