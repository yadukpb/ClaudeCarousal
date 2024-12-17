import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { BACKEND_URL } from '../constants'

const StickyContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitialAnimation, setShowInitialAnimation] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(() => {
    return localStorage.getItem('hasAutoOpened') === 'true'
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [selectedConsultationTime, setSelectedConsultationTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    contact: '',
    question: ''
  });

  useEffect(() => {
    const hasShown = localStorage.getItem('hasAutoOpened');
    if (!hasShown) {
      const animationTimer = setTimeout(() => {
        setShowInitialAnimation(true);
      }, 7500);

      const openTimer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
        localStorage.setItem('hasAutoOpened', 'true');
      }, 8000);

      return () => {
        clearTimeout(animationTimer);
        clearTimeout(openTimer);
      };
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasAutoOpened', 'true');
  };

  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1);
    if (newDate >= new Date()) {
      setSelectedDate(newDate);
    }
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  const handleYearChange = (increment) => {
    const newDate = new Date(selectedDate.getFullYear() + increment, selectedDate.getMonth());
    if (increment > 0 || newDate >= new Date()) {
      setSelectedDate(newDate);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotClick = (time) => {
    setSelectedConsultationTime(time);
    setShowForm(true);
  };

  const generateCalendarDays = () => {
    const days = [];
    const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const firstDay = currentDate.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    while (currentDate.getMonth() === selectedDate.getMonth()) {
      const date = new Date(currentDate);
      const isPastDate = date < today;
      days.push(
        <div
          key={date.getDate()}
          className={`w-10 h-10 border flex items-center justify-center ${
            isPastDate 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-[#EFE6DA] ' +
                (date.getDate() === selectedDate.getDate() ? 'bg-blue-500 text-white' : '')
          }`}
          onClick={() => !isPastDate && handleDateClick(date)}
        >
          {date.getDate()}
        </div>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    const date = new Date(selectedDate);
    const now = new Date();
    
    const addTimeSlots = (startHour, endHour) => {
      const start = new Date(date.setHours(startHour, 0, 0));
      const end = new Date(date.setHours(endHour, 30, 0));
      
      while (start <= end) {
        const isToday = start.toDateString() === now.toDateString();
        const isPastTime = isToday && start < now;
        
        if (!isPastTime) {
          timeSlots.push({
            time: start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            period: startHour < 17 ? 'afternoon' : 'evening',
            disabled: isPastTime
          });
        }
        start.setMinutes(start.getMinutes() + 25);
      }
    };

    addTimeSlots(13, 16);
    addTimeSlots(20, 22);

    return timeSlots;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        const consultationData = {
            ...formData,
            date: selectedDate.toISOString(),
            time: selectedConsultationTime,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/consultation/schedule-consultation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(consultationData),
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to schedule consultation');
        }

        const result = await response.json();
        setIsOpen(false);
        setFormData({
            name: '',
            profession: '',
            contact: '',
            question: ''
        });

        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'consultation_scheduled', {
                event_category: 'Engagement',
                event_label: 'Legal Consultation'
            });
        }
    } catch (error) {
        console.error('Error scheduling consultation:', error);
        alert('Failed to schedule consultation. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-label="Book Free Legal Consultation"
        itemScope
        itemType="http://schema.org/Service"
      >
        <meta itemProp="name" content="Free Legal Consultation Booking" />
        <meta itemProp="description" content="Schedule a free 25-minute legal consultation with our experienced attorneys" />
        <meta itemProp="provider" content="Your Law Firm Name" />
        
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4 animate-fadeIn">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fadeIn" onClick={handleClose}></div>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[900px] relative z-50 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slideUp">
              <div className="bg-[#343842] p-3 md:p-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
                <div>
                  <h1 className="font-['Hepta_Slab'] text-white text-lg sm:text-xl md:text-2xl font-[500]">Free Legal Consultation</h1>
                  <meta name="description" content="Book your 25-minute free legal consultation with our experienced attorneys" />
                  <p className="font-['Jost'] text-gray-200 text-xs sm:text-sm md:text-base">Book your 25-minute session</p>
                </div>
                <button 
                  onClick={handleClose} 
                  aria-label="Close consultation booking"
                  className="text-white hover:text-[#EFE6DA] transition-colors p-1">
                  <X size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="p-3 sm:p-4">
                <div className="mb-4 bg-[#EFE6DA] p-2 sm:p-3 rounded-lg">
                  <p className="font-['Jost'] text-[#343842] text-sm sm:text-base">
                    <span className="font-bold">FREE 25-minute consultation</span> with our experienced legal team. Available daily:
                    <br /> 1:00 PM - 4:30 PM
                    <br />• 8:00 PM - 10:30 PM
                  </p>
                </div>

                {!showForm && (
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    <div className="w-full lg:w-[400px]">
                      <div className="calendar-section overflow-x-auto">
                        <div className="flex items-center justify-between mb-4 min-w-[280px]">
                          <button onClick={handlePrevMonth} className="p-1 sm:p-2 hover:bg-[#EFE6DA] rounded-full">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button onClick={() => handleYearChange(-1)} className="p-1 hover:bg-[#EFE6DA] rounded">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            <span className="font-['Hepta_Slab'] text-base sm:text-xl text-[#343842] font-[500]">
                              {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
                            </span>
                            <button onClick={() => handleYearChange(1)} className="p-1 hover:bg-[#EFE6DA] rounded">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                          </div>
                          <button onClick={handleNextMonth} className="p-1 sm:p-2 hover:bg-[#EFE6DA] rounded-full">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center mb-4 min-w-[280px]">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                            <div key={index} className="text-xs sm:text-sm font-bold text-[#343842]">{day}</div>
                          ))}
                          {generateCalendarDays()}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-['Hepta_Slab'] text-lg sm:text-xl text-[#343842] font-[500] mb-3">Available Times</h4>
                      <div className="space-y-4">
                        <div className="overflow-x-auto">
                          <h5 className="font-['Jost'] text-[#343842] font-medium mb-2 text-sm sm:text-base">Afternoon (1:00 PM - 4:30 PM)</h5>
                          <div className="flex flex-wrap gap-1 sm:gap-2 min-w-[280px]">
                            {generateTimeSlots()
                              .filter(slot => slot.period === 'afternoon')
                              .map((slot, index) => (
                                <button
                                  key={index}
                                  className={`font-['Jost'] rounded-md border px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                                    slot.time === selectedConsultationTime
                                      ? 'bg-[#343842] text-white'
                                      : 'bg-white text-[#343842] hover:bg-[#EFE6DA]'
                                  }`}
                                  onClick={() => handleTimeSlotClick(slot.time)}
                                >
                                  {slot.time}
                                </button>
                              ))}
                          </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <h5 className="font-['Jost'] text-[#343842] font-medium mb-2 text-sm sm:text-base">Evening (8:00 PM - 10:30 PM)</h5>
                          <div className="flex flex-wrap gap-1 sm:gap-2 min-w-[280px]">
                            {generateTimeSlots()
                              .filter(slot => slot.period === 'evening')
                              .map((slot, index) => (
                                <button
                                  key={index}
                                  className={`font-['Jost'] rounded-md border px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                                    slot.time === selectedConsultationTime
                                      ? 'bg-[#343842] text-white'
                                      : 'bg-white text-[#343842] hover:bg-[#EFE6DA]'
                                  }`}
                                  onClick={() => handleTimeSlotClick(slot.time)}
                                >
                                  {slot.time}
                                </button>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {showForm && (
                  <div className="mt-6 pt-6">
                    <h4 className="font-['Hepta_Slab'] text-xl text-[#343842] font-[500] mb-4">Complete Your Booking</h4>
                    
                    <div className="mb-6 p-3 bg-[#EFE6DA] rounded-lg">
                      <p className="font-['Jost'] text-[#343842] text-sm sm:text-base">
                        <span className="font-bold">Selected Date & Time:</span>
                        <br />
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        <br />
                        {selectedConsultationTime}
                      </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Full Name"
                          required
                          aria-label="Full Name"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#343842] font-['Jost']"
                        />
                        <input
                          type="text"
                          name="profession"
                          value={formData.profession}
                          onChange={handleInputChange}
                          placeholder="Profession"
                          required
                          aria-label="Profession"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#343842] font-['Jost']"
                        />
                      </div>

                      <input
                        type="email"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        required
                        aria-label="Email Address"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#343842] font-['Jost']"
                      />

                      <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleInputChange}
                        placeholder="Brief description of your legal question"
                        required
                        rows={4}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#343842] font-['Jost']"
                      />

                      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          type="button"
                          className="font-['Jost'] w-full sm:w-auto px-4 py-2 text-[#343842] bg-[#EFE6DA] rounded-md hover:bg-gray-200 transition-all duration-300"
                          onClick={() => {
                            setShowForm(false)
                            setSelectedConsultationTime(null)
                          }}
                        >
                          Change Date/Time
                        </button>
                        <button
                          type="submit"
                          className="font-['Jost'] w-full sm:w-auto px-4 py-2 text-white bg-[#343842] rounded-md hover:bg-gray-700 transition-all duration-300"
                        >
                          Schedule Consultation
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'consultation_button_click', {
              event_category: 'Engagement'
            })
          }
        }}
        aria-label="Open consultation booking"
        className={`bg-[#343842] text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:bg-[#EFE6DA] hover:text-[#343842] transition-all duration-300 flex items-center justify-center group relative ${
          showInitialAnimation ? 'animate-bounce' : 'opacity-0'
        } ${isOpen ? 'scale-100' : ''}`}
      >
        {!isOpen ? (
          <>
            <MessageCircle size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center animate-pulse">1</span>
          </>
        ) : (
          <X size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};

export default React.memo(StickyContact);