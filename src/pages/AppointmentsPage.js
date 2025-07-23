import React, { useState, useEffect } from 'react';

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Check if user is logged in
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const [bookingForm, setBookingForm] = useState({
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    symptoms: '',
    notes: '',
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientPhone: '',
    emergencyContact: ''
  });

  const [paymentForm, setPaymentForm] = useState({
    upiId: '',
    paymentMethod: 'upi'
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockDoctors = [
      { id: 1, name: "Dr. Meera Reddy", specialization: "Cardiologist", fee: 800, experience: "15 years", rating: 4.8 },
      { id: 2, name: "Dr. Sunita Gupta", specialization: "Orthopedic Surgeon", fee: 700, experience: "12 years", rating: 4.7 },
      { id: 3, name: "Dr. Priya Sharma", specialization: "Pediatrician", fee: 600, experience: "10 years", rating: 4.9 },
      { id: 4, name: "Dr. Anita Patel", specialization: "Neurologist", fee: 900, experience: "18 years", rating: 4.6 },
      { id: 5, name: "Dr. Kavya Nair", specialization: "Gynecologist", fee: 650, experience: "8 years", rating: 4.8 },
      { id: 6, name: "Dr. Rashika Kumar", specialization: "General Surgeon", fee: 750, experience: "20 years", rating: 4.7 },
      { id: 7, name: "Dr. Suneet Gupta", specialization: "Cardiologist", fee: 800, experience: "15 years", rating: 4.8 }
    ];

    const mockAppointments = [
      {
        id: 1,
        doctorName: "Dr. Meera Reddy",
        specialization: "Cardiologist",
        date: "2025-07-20",
        time: "10:00 AM",
        status: "scheduled",
        symptoms: "Chest pain and shortness of breath",
        fee: 800,
        paymentStatus: "paid"
      },
      {
        id: 2,
        doctorName: "Dr. Sunita Gupta",
        specialization: "Orthopedic Surgeon",
        date: "2025-07-22",
        time: "2:30 PM",
        status: "completed",
        symptoms: "Knee pain and stiffness",
        fee: 700,
        paymentStatus: "paid"
      }
    ];

    // Simulate loading doctors and appointments
    setTimeout(() => {
      setDoctors(mockDoctors);
      if (user) {
        setAppointments(mockAppointments);
      }
      setLoading(false);
    }, 1000);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please login to book an appointment');
      return;
    }
    
    // Find selected doctor
    const selectedDoctor = doctors.find(d => d.id === parseInt(bookingForm.doctorId));
    
    if (!selectedDoctor) {
      setError('Please select a doctor');
      return;
    }

    // Validate form
    if (!bookingForm.patientName || !bookingForm.patientAge || !bookingForm.patientPhone) {
      setError('Please fill in all required patient information');
      return;
    }

    // Create booking object
    const booking = {
      ...bookingForm,
      doctor: selectedDoctor,
      totalAmount: selectedDoctor.fee + 50, // Adding ₹50 convenience fee
      consultationFee: selectedDoctor.fee,
      convenienceFee: 50
    };

    setCurrentBooking(booking);
    setShowBookingForm(false);
    setShowPaymentModal(true);
    setError('');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create new appointment
      const newAppointment = {
        id: appointments.length + 1,
        doctorName: currentBooking.doctor.name,
        specialization: currentBooking.doctor.specialization,
        date: currentBooking.appointmentDate,
        time: currentBooking.appointmentTime,
        status: 'confirmed',
        symptoms: currentBooking.symptoms,
        notes: currentBooking.notes,
        fee: currentBooking.consultationFee,
        paymentStatus: 'paid',
        patientName: currentBooking.patientName,
        patientAge: currentBooking.patientAge,
        patientGender: currentBooking.patientGender,
        patientPhone: currentBooking.patientPhone,
        emergencyContact: currentBooking.emergencyContact,
        bookingId: `BK${Date.now()}`,
        paymentId: `PAY${Date.now()}`
      };

      setAppointments(prev => [...prev, newAppointment]);
      setPaymentSuccess(true);
      
      // Reset forms
      setBookingForm({
        doctorId: '',
        appointmentDate: '',
        appointmentTime: '',
        symptoms: '',
        notes: '',
        patientName: '',
        patientAge: '',
        patientGender: '',
        patientPhone: '',
        emergencyContact: ''
      });
      setPaymentForm({
        upiId: '',
        paymentMethod: 'upi'
      });

      // Close modal after success message
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
        setCurrentBooking(null);
      }, 3000);

    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Appointments</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Book and manage your appointments with our expert doctors
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Book Appointment Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
            <button
              onClick={() => setShowBookingForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Book New Appointment
            </button>
          </div>

          {/* Appointments List */}
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
              <p className="text-gray-600">Book your first appointment to get started</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{appointment.doctorName}</h3>
                      <p className="text-blue-600 font-medium">{appointment.specialization}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
                      </svg>
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {appointment.time}
                    </div>
                  </div>
                  
                  {appointment.symptoms && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">Symptoms:</p>
                      <p className="text-gray-600">{appointment.symptoms}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Reschedule
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Cancel
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Book New Appointment</h3>
                <button
                  onClick={() => {
                    setShowBookingForm(false);
                    setError('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-6">
                {/* Doctor Selection */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Doctor *
                    </label>
                    <select
                      name="doctorId"
                      value={bookingForm.doctorId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose a doctor...</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization} (₹{doctor.fee})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Patient Information */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        value={bookingForm.patientName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter patient's full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        name="patientAge"
                        value={bookingForm.patientAge}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="120"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Age"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        name="patientGender"
                        value={bookingForm.patientGender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="patientPhone"
                        value={bookingForm.patientPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 9999999999"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={bookingForm.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Emergency contact number"
                      />
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Appointment Date *
                      </label>
                      <input
                        type="date"
                        name="appointmentDate"
                        value={bookingForm.appointmentDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="appointmentTime"
                        value={bookingForm.appointmentTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select time...</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Symptoms / Reason for Visit *
                      </label>
                      <textarea
                        name="symptoms"
                        value={bookingForm.symptoms}
                        onChange={handleInputChange}
                        rows={3}
                        required
                        placeholder="Describe your symptoms or reason for the appointment..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={bookingForm.notes}
                        onChange={handleInputChange}
                        rows={2}
                        placeholder="Any additional information..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Fee Summary */}
                {bookingForm.doctorId && (
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Fee Summary</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {(() => {
                        const selectedDoctor = doctors.find(d => d.id === parseInt(bookingForm.doctorId));
                        return selectedDoctor ? (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Consultation Fee:</span>
                              <span>₹{selectedDoctor.fee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Convenience Fee:</span>
                              <span>₹50</span>
                            </div>
                            <div className="border-t pt-2">
                              <div className="flex justify-between font-semibold text-lg">
                                <span>Total Amount:</span>
                                <span>₹{selectedDoctor.fee + 50}</span>
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Proceed to Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* UPI Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              {paymentSuccess ? (
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 mb-4">Your appointment has been confirmed</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Appointment details sent to your registered mobile number</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Complete Payment</h3>
                    <button
                      onClick={() => {
                        setShowPaymentModal(false);
                        setShowBookingForm(true);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {currentBooking && (
                    <>
                      {/* Booking Summary */}
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h4 className="font-semibold text-blue-900 mb-2">Booking Summary</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Doctor:</span> {currentBooking.doctor.name}</p>
                          <p><span className="font-medium">Date:</span> {new Date(currentBooking.appointmentDate).toLocaleDateString()}</p>
                          <p><span className="font-medium">Time:</span> {currentBooking.appointmentTime}</p>
                          <p><span className="font-medium">Patient:</span> {currentBooking.patientName}</p>
                        </div>
                      </div>

                      {/* Payment Amount */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total Amount:</span>
                          <span className="text-2xl font-bold text-blue-600">₹{currentBooking.totalAmount}</span>
                        </div>
                      </div>

                      {/* UPI Payment Form */}
                      <form onSubmit={handlePaymentSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Payment Method
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="upi"
                                checked={paymentForm.paymentMethod === 'upi'}
                                onChange={handlePaymentInputChange}
                                className="mr-2"
                              />
                              <span>UPI Payment</span>
                            </label>
                          </div>
                        </div>

                        {paymentForm.paymentMethod === 'upi' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              UPI ID *
                            </label>
                            <input
                              type="text"
                              name="upiId"
                              value={paymentForm.upiId}
                              onChange={handlePaymentInputChange}
                              required
                              placeholder="yourname@paytm / yourname@gpay"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Enter your UPI ID (e.g., 9999999999@paytm, name@gpay)
                            </p>
                          </div>
                        )}

                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <p className="text-sm text-yellow-800">
                              This is a demo. Your payment will be simulated.
                            </p>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={paymentLoading}
                          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {paymentLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Processing Payment...
                            </>
                          ) : (
                            `Pay ₹${currentBooking.totalAmount} via UPI`
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentsPage;
