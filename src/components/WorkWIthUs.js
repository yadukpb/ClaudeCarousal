import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { BACKEND_URL } from '../constants';

const WorkWithUs = () => {
  const [isInternship, setIsInternship] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    preferredMonth: '',
    internshipDuration: '',
    preferredPracticeArea: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/api/workwithus/internship`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Application submitted successfully');
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          contactNumber: '',
          preferredMonth: '',
          internshipDuration: '',
          preferredPracticeArea: ''
        });
      } else {
        alert('Error submitting application');
      }
    } catch (error) {
      alert('Error submitting application');
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-16">
      <div className="relative" style={{ height: '100vh' }}>
        <img src="/workwithus.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-100" />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
          <div className="relative z-10 text-center text-white">
            <h1 className="text-6xl font-normal">Join us in Leveraging Learning, Lifting Lives.</h1>
          </div>
          <h2 className="font-cormorant text-[60px] leading-[70px] font-normal text-amber-600">Work With Us</h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <h2 className="font-cormorant text-[45px] leading-[53px] font-bold text-[#1A1A1A] mb-4">
            Work With Us
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p className="font-cormorant text-2xl text-[#4A4A4A]">
            Join our team as an intern or apply for a job
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <button onClick={() => setIsInternship(true)} className={`px-4 py-2 ${isInternship ? 'bg-amber-600 text-white' : 'bg-white text-amber-600'}`}>
            Internship
          </button>
          <button onClick={() => setIsInternship(false)} className={`px-4 py-2 ${!isInternship ? 'bg-amber-600 text-white' : 'bg-white text-amber-600'}`}>
            Job
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h4 className="font-bold">Growth</h4>
            <p>We foster an environment of continuous learning and development.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h4 className="font-bold">Inclusivity</h4>
            <p>We believe in creating a diverse and inclusive workplace.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h4 className="font-bold">Innovation</h4>
            <p>We encourage innovative thinking and creative solutions.</p>
          </div>
        </div>

        {isInternship ? (
          <div className="bg-white rounded-xl shadow-xl p-16">
            <h3 className="font-cormorant text-3xl mb-4">Internship Application</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <TextField name="firstName" label="First Name" fullWidth onChange={handleChange} required />
              <TextField name="lastName" label="Last Name" fullWidth onChange={handleChange} required />
              <TextField name="email" label="Email" fullWidth onChange={handleChange} required />
              <TextField name="contactNumber" label="Contact Number" fullWidth onChange={handleChange} required />
              <TextField name="preferredMonth" label="Preferred Month" fullWidth onChange={handleChange} required />
              <TextField name="internshipDuration" label="Internship Duration" fullWidth onChange={handleChange} required />
              <TextField name="preferredPracticeArea" label="Preferred Practice Area" fullWidth onChange={handleChange} required />
              <div className="pt-6">
                <button type="submit" className="bg-amber-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-amber-700 transition-colors transform hover:scale-105">
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h3 className="font-cormorant text-2xl mb-4">Job Openings</h3>
            <p className="text-gray-500">Currently, there are no job openings available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkWithUs;