import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedConsultationTime, setSelectedConsultationTime] = useState(null);

  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Function to handle time slot selection
  const handleTimeSlotClick = (time) => {
    setSelectedConsultationTime(time);
    setShowConsultationModal(true);
  };

  // Function to generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const firstDay = currentDate.getDay();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    // Add days of the month
    while (currentDate.getMonth() === selectedDate.getMonth()) {
      const date = new Date(currentDate);
      days.push(
        <div
          key={date.getDate()}
          className={`w-10 h-10 border cursor-pointer ${
            date.getDate() === selectedDate.getDate() ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handleDateClick(date)}
        >
          {date.getDate()}
        </div>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  // Function to generate available time slots
  const generateTimeSlots = () => {
    const timeSlots = [];
    const startTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 20, 0, 0); // 8:00 PM
    const endTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 22, 30, 0); // 10:30 PM

    while (startTime <= endTime) {
      timeSlots.push(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      startTime.setMinutes(startTime.getMinutes() + 25);
    }

    return timeSlots;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold mb-4">
        {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
      </div>
      <div className="grid grid-cols-7 gap-1">
        <div className="w-10 h-10 font-bold">Sun</div>
        <div className="w-10 h-10 font-bold">Mon</div>
        <div className="w-10 h-10 font-bold">Tue</div>
        <div className="w-10 h-10 font-bold">Wed</div>
        <div className="w-10 h-10 font-bold">Thu</div>
        <div className="w-10 h-10 font-bold">Fri</div>
        <div className="w-10 h-10 font-bold">Sat</div>
        {generateCalendarDays()}
      </div>

      {/* Consultation Modal */}
      <Transition appear show={showConsultationModal} as="div" className="fixed inset-0 z-50 overflow-y-auto">
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Free 25-Minute Consultation</h3>
              <p className="mt-2">
                We'd be happy to offer you a free 25-minute consultation. Please select a time slot below to schedule your meeting.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {generateTimeSlots().map((time, index) => (
                  <button
                    key={index}
                    className={`rounded-md border px-4 py-2 text-sm font-medium ${
                      time === selectedConsultationTime
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleTimeSlotClick(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => setShowConsultationModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Transition>
    </div>
  );
};

export default Calendar;