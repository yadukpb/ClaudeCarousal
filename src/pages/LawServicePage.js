import React from 'react';
import { motion } from 'framer-motion';

const LawServicePage = () => {
  const serviceCategories = [
    {
      title: "For Corporates",
      motto: "Empowering Small Firms with Practical Legal Solutions",
      services: [
        { title: "Business Structuring Advice", description: "Advising on the best structure for tax efficiency and liability protection", icon: "business" },
        { title: "Contract Drafting and Review", description: "Preparing and reviewing service agreements, NDAs, vendor agreements, employment contracts, and more", icon: "description" },
        { title: "Lease and Licensing", description: "Tailoring agreements for office spaces and operational needs", icon: "real_estate_agent" },
        { title: "Standard Terms", description: "Drafting for products/services offered by the firm", icon: "gavel" },
        { title: "Employment Contracts", description: "Ensuring legally sound contracts for hiring", icon: "group" },
        { title: "E-commerce Solutions", description: "Drafting website terms, privacy policies, and compliance with consumer protection laws", icon: "shopping_cart" },
        { title: "Preliminary Documents", description: "Drafting MoU, LoI, and Term sheets for various business needs", icon: "file_present" },
        { title: "Content Creation", description: "Writing blog posts, articles, or newsletters to attract clients", icon: "edit_note" }
      ]
    },
    {
      title: "For Lawyers",
      motto: "Focused Research, Sharper Results",
      services: [
        { title: "Case Law Research", description: "Providing precise and well-researched case law summaries", icon: "search" },
        { title: "Document Drafting", description: "Preparing pleadings, affidavits, legal notices, and contracts", icon: "draft" },
        { title: "Pleadings Preparation", description: "Writing detailed legal memos or briefs for court submissions", icon: "description" },
        { title: "Precedent Development", description: "Creating templates for frequently used legal documents", icon: "file_copy" },
        { title: "Case Analysis", description: "Helping with review of facts, legal issues, and arguments", icon: "analytics" },
        { title: "Legal Updates", description: "Providing updates on new laws, regulations, and judgments", icon: "update" },
        { title: "Legal Opinions", description: "Assisting clients with prospective legal hurdles and compliances", icon: "balance" },
        { title: "Limitation Tracking", description: "Helping monitor and manage deadlines", icon: "schedule" }
      ]
    },
    {
      title: "For Budding Lawyers",
      motto: "Turning Good Projects into Great Ones",
      services: [
        { title: "Article Review", description: "Reviewing and refining research papers, essays, and articles for publication", icon: "rate_review" },
        { title: "Project Assistance", description: "Assisting with structuring and formatting academic assignments", icon: "assignment" },
        { title: "Moot Court Prep", description: "Offering guidance on memorial drafting, research, and oral arguments", icon: "school" },
        { title: "Thesis Support", description: "Supporting in topic selection, research, and writing for dissertations", icon: "menu_book" },
        { title: "Case Summaries", description: "Providing concise summaries and analysis for academic purposes", icon: "summarize" },
        { title: "Application Help", description: "Assisting with CV and cover letter drafting for internships", icon: "work" },
        { title: "Mock Interviews", description: "Conducting simulated interviews for internship preparation", icon: "record_voice_over" }
      ]
    }
  ]

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{opacity: 0, y: -20}} 
          animate={{opacity: 1, y: 0}} 
          className="text-center mb-12 sm:mb-20"
        >
          <h1 className="font-cormorant text-3xl sm:text-[45px] leading-tight sm:leading-[53px] font-bold text-[#1A1A1A] mb-4 sm:mb-8">Legal Services Excellence</h1>
          <p className="font-cormorant text-xl sm:text-2xl text-[#4A4A4A] max-w-3xl mx-auto">Comprehensive legal solutions tailored to your specific needs</p>
        </motion.div>

        {serviceCategories.map((category, categoryIndex) => (
          <motion.div key={category.title} initial={{opacity: 0}} animate={{opacity: 1}} className="mb-12 sm:mb-20">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
              <motion.div className="w-full sm:w-1/4">
                <div className="sm:sticky sm:top-28">
                  <h2 className="font-cormorant text-3xl sm:text-[40px] font-bold text-[#1A1A1A] mb-2 sm:mb-4">{category.title}</h2>
                  <p className="font-cormorant text-lg sm:text-xl text-[#B8860B]">{category.motto}</p>
                </div>
              </motion.div>

              <div className="hidden sm:block w-px bg-[#E8E8E8] self-stretch"></div>

              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                  {category.services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{delay: index * 0.1}}
                      whileHover={{y: -5, scale: 1.02}}
                      className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8E8E8]"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-[#F5EEE6] rounded-lg flex items-center justify-center">
                        <i className="material-symbols-outlined text-xl sm:text-2xl text-[#B8860B]">{service.icon}</i>
                      </div>
                      <h3 className="font-cormorant text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-[#1A1A1A]">{service.title}</h3>
                      <p className="text-[#4A4A4A] text-xs sm:text-sm leading-relaxed">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LawServicePage