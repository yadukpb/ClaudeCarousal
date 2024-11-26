import React from 'react';
import { motion } from 'framer-motion';

const VisionMission = ({ title, content, isVision }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl p-8 shadow-lg border border-[#E8E8E8]"
  >
    <h3 className="font-cormorant text-2xl font-bold mb-6 text-[#1A1A1A]">{title}</h3>
    {isVision ? (
      <p className="text-[#4A4A4A] text-lg leading-relaxed">{content}</p>
    ) : (
      <ul className="space-y-4">
        {content.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-amber-600 font-bold mt-1">•</span>
            <p className="text-[#4A4A4A] text-lg leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);

const FounderCard = ({ name, role, image, email }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#E8E8E8] transform hover:scale-105 transition-transform duration-300"
  >
    <img src={image} alt={name} className="w-full h-72 object-cover" />
    <div className="p-6">
      <h4 className="font-cormorant text-xl font-bold text-[#1A1A1A]">{name}</h4>
      <p className="text-amber-600 text-sm mb-2">{role}</p>
      <a href={`mailto:${email}`} className="text-[#4A4A4A] text-sm hover:text-amber-600">{email}</a>
    </div>
  </motion.div>
);

const AboutUs = () => {
  const missionPoints = [
    "Relieve overburdened lawyers by providing meticulous legal research tailored to their needs.",
    "Support law students in achieving academic and professional excellence through guided assistance with reviewing projects, moots, and research.",
    "Offer startups and corporations accessible legal solutions, simplifying complex legal challenges.",
    "Foster legal awareness through educational blogs and approachable consultation services.",
    "Build a trusted, client-centric platform that leverages technology and expertise to deliver exceptional legal support efficiently."
  ];

  const founders = [
    {
      name: "Suyash",
      role: "Co-Founder",
      image: "/images/founder1.jpg",
      email: "suyash@legalplatform.com"
    },
    {
      name: "Ayush",
      role: "Co-Founder",
      image: "/images/founder2.jpg",
      email: "ayush@legalplatform.com"
    },
    {
      name: "Akash",
      role: "Co-Founder",
      image: "/images/founder3.jpg",
      email: "akash@legalplatform.com"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-cormorant text-6xl font-bold text-[#1A1A1A] mb-4">
            Who We Are
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p className="font-cormorant text-2xl text-[#4A4A4A] max-w-3xl mx-auto">
            Elite Law Students from NLSIU, Pioneering Legal Innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <VisionMission title="Our Vision" content="To become the go-to platform for affordable and reliable legal assistance, empowering lawyers, law students, start-ups, corporations and the wide array of people who reach out to us with high-quality research, insights, and support to excel in their professional, academic and legal pursuits." isVision={true} />
          <VisionMission title="Our Mission" content={missionPoints} isVision={false} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-cormorant text-4xl font-bold text-[#1A1A1A] mb-4">Meet Our Founders</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <FounderCard key={index} {...founder} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-8 shadow-xl border border-[#E8E8E8] transform hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <img
              src="/images/about-team.jpg"
              alt="Our Team"
              className="w-full h-[450px] object-cover rounded-lg shadow-lg"
            />
            <div className="flex flex-col justify-center">
              <h3 className="font-cormorant text-3xl font-bold mb-6 text-[#1A1A1A]">
                Free Legal Consultation
              </h3>
              <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8">
                Book a free 25-minute consultation to discuss your legal needs and understand how we can assist you. Our team of NLSIU law students is ready to provide expert guidance tailored to your specific requirements.
              </p>
              <button className="bg-amber-600 text-white px-10 py-4 rounded-lg hover:bg-amber-700 transition-colors duration-300 w-fit text-lg font-semibold shadow-lg hover:shadow-xl">
                Schedule Your Free Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;