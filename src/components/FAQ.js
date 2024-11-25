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
      question: "What types of business entities are there?",
      answer: "Quisque nec iaculis nibh. Suspendisse tempus orci nec enim maximus the quis maximus quam suscipit. Fusce dignissim turpis eu neque vehicula condimentum. Morbi pretium orci sed elementum lacinia sapien leo facilisis quam, quis elementum risus nulla."
    },
    {
      question: "Do I need legal advice just to form my business?",
      answer: "While it's possible to form a business on your own, seeking legal advice can help ensure compliance with all regulations and protect your interests in the long run."
    },
    {
      question: "What should my attorney expect from me?",
      answer: "Your attorney will expect honest communication, timely responses, complete documentation, and full disclosure of relevant information about your business situation."
    },
    {
      question: "What is the role of witness in court?",
      answer: "A witness provides testimony under oath about facts related to a case, helping establish truth and providing evidence to support legal arguments."
    },
    {
      question: "Does my business need a separate tax identification number?",
      answer: "Most businesses require a separate tax ID (EIN) for tax filing and banking purposes, though some sole proprietorships can use the owner's SSN."
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