import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="transform transition-all duration-300 hover:scale-[1.01]">
      <button
        className={`w-full text-left p-6 flex justify-between items-center rounded-lg shadow-sm border ${
          isOpen 
            ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border-amber-400' 
            : 'bg-white hover:bg-amber-50 border-gray-100'
        }`}
        onClick={onClick}
      >
        <span className="font-semibold text-lg">{question}</span>
        {isOpen ? (
          <Minus className="w-6 h-6 flex-shrink-0" />
        ) : (
          <Plus className="w-6 h-6 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="p-6 bg-white border border-t-0 rounded-b-lg shadow-sm">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const faqData = [
    {
      question: "What services do you provide for lawyers?",
      answer: "We provide comprehensive legal research services, document drafting including pleadings and affidavits, case law summaries, precedent development, and customized legal updates. Our team from NLSIU offers focused research solutions to help lawyers manage their workload efficiently."
    },
    {
      question: "How can you assist law students?",
      answer: "We offer project review services, moot court preparation assistance, thesis guidance, and research support. While we don't complete assignments, we provide valuable feedback and guidance to help students improve their work quality and research skills."
    },
    {
      question: "What is included in your free consultation?",
      answer: "Our free 25-minute consultation allows you to discuss your legal needs, understand our services better, and explore how we can assist you. This session can be scheduled through our online booking system for a virtual meeting."
    },
    {
      question: "How do you support startups and corporations?",
      answer: "We offer business structuring advice, contract drafting and review, lease agreement assistance, employment contract preparation, and e-commerce legal compliance support. Our services are designed to provide practical legal solutions for growing businesses."
    },
    {
      question: "What makes LegalEase Solutions unique?",
      answer: "As NLSIU law students, we combine academic excellence with practical legal knowledge to provide high-quality, affordable legal assistance. Our platform specializes in thorough legal research, academic support, and corporate legal services with a client-centric approach."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50">
      <div className="flex gap-16 items-start">
        <div className="w-1/2">
          <div className="mb-12">
            <h2 className="text-sm uppercase tracking-wider text-amber-600 font-semibold mb-3">FAQ</h2>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h1>
            <p className="text-gray-600 text-lg">Find answers to common questions about legal services and business formation.</p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={index === openIndex}
                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
              />
            ))}
          </div>
        </div>

        <div className="w-1/2 sticky top-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://shtheme.org/demosd/mcgill/wp-content/uploads/2021/11/about.jpg"
              alt="FAQ illustration"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;