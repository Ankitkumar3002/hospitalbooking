import React, { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with us for appointments, inquiries, or any assistance you need
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-600">
                      Jagjeevan Hospital<br />
                      123 Medical Centre Road<br />
                      Healthcare District<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Numbers</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>Emergency: +91 99999 99999</p>
                      <p>Appointments: +91 88888 88888</p>
                      <p>General Inquiry: +91 77777 77777</p>
                      <p>Ambulance: +91 66666 66666</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>info@jagjeevanhospital.com</p>
                      <p>appointments@jagjeevanhospital.com</p>
                      <p>emergency@jagjeevanhospital.com</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Hospital Hours</h3>
                    <div className="space-y-1 text-gray-600">
                      <p><span className="font-medium">Emergency:</span> 24/7</p>
                      <p><span className="font-medium">OPD:</span> 8:00 AM - 8:00 PM</p>
                      <p><span className="font-medium">Visiting Hours:</span> 4:00 PM - 7:00 PM</p>
                      <p><span className="font-medium">Lab Services:</span> 6:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Banner */}
              <div className="mt-8 bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Emergency Services
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>For medical emergencies, call <strong>+91 99999 99999</strong> or visit our emergency department directly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                
                {submitted && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    Thank you for your message! We'll get back to you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="appointment">Appointment Inquiry</option>
                      <option value="general">General Information</option>
                      <option value="billing">Billing Question</option>
                      <option value="complaint">Complaint/Feedback</option>
                      <option value="insurance">Insurance Query</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-gray-600">Located in the heart of the medical district for easy access</p>
          </div>
          
          {/* Map placeholder - In a real application, you would integrate with Google Maps or similar */}
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-600">Interactive map will be displayed here</p>
              <p className="text-sm text-gray-500 mt-2">
                123 Medical Centre Road, Healthcare District, Mumbai, Maharashtra 400001
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Contact</h2>
            <p className="text-gray-600">Choose the best way to reach us based on your needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency</h3>
              <p className="text-gray-600 mb-4">
                For life-threatening emergencies and urgent medical care
              </p>
              <a 
                href="tel:+919999999999"
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors inline-block"
              >
                Call Now: +91 99999 99999
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Appointments</h3>
              <p className="text-gray-600 mb-4">
                Schedule appointments with our specialist doctors
              </p>
              <a 
                href="tel:+918888888888"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                Call: +91 88888 88888
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">General Inquiry</h3>
              <p className="text-gray-600 mb-4">
                For general information, billing, and other questions
              </p>
              <a 
                href="tel:+917777777777"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors inline-block"
              >
                Call: +91 77777 77777
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Department Contacts</h2>
            <p className="text-gray-600">Direct contact information for our specialized departments</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-2 rounded-lg mr-3">
                  <span className="text-xl">❤️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Cardiology</h3>
                  <p className="text-sm text-gray-600">Heart Care Department</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +91 88888 88801</p>
                <p>📧 cardiology@jagjeevanhospital.com</p>
                <p>🕒 Mon-Fri: 9:00 AM - 5:00 PM</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <span className="text-xl">🦴</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Orthopedics</h3>
                  <p className="text-sm text-gray-600">Bone & Joint Care</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +91 88888 88802</p>
                <p>📧 orthopedics@jagjeevanhospital.com</p>
                <p>🕒 Mon-Sat: 10:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <span className="text-xl">👶</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Pediatrics</h3>
                  <p className="text-sm text-gray-600">Children's Healthcare</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +91 88888 88803</p>
                <p>📧 pediatrics@jagjeevanhospital.com</p>
                <p>🕒 Mon-Fri: 8:00 AM - 4:00 PM</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <span className="text-xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Neurology</h3>
                  <p className="text-sm text-gray-600">Brain & Nervous System</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +91 88888 88804</p>
                <p>📧 neurology@jagjeevanhospital.com</p>
                <p>🕒 Tue-Sat: 11:00 AM - 7:00 PM</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-pink-100 p-2 rounded-lg mr-3">
                  <span className="text-xl">👩</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Gynecology</h3>
                  <p className="text-sm text-gray-600">Women's Health</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +91 88888 88805</p>
                <p>📧 gynecology@jagjeevanhospital.com</p>
                <p>🕒 Mon-Sat: 9:00 AM - 5:00 PM</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <span className="text-xl">⚕️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">General Surgery</h3>
                  <p className="text-sm text-gray-600">Surgical Services</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +91 88888 88806</p>
                <p>📧 surgery@jagjeevanhospital.com</p>
                <p>🕒 Mon-Fri: 7:00 AM - 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services Contact */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-gray-600">Contact information for our support services and facilities</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🚑</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ambulance</h3>
              <p className="text-gray-600 text-sm mb-3">24/7 Emergency Transport</p>
              <a href="tel:+916666666666" className="text-blue-600 hover:text-blue-800 font-medium">
                +91 66666 66666
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🧪</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Laboratory</h3>
              <p className="text-gray-600 text-sm mb-3">Diagnostic Tests & Reports</p>
              <a href="tel:+915555555555" className="text-blue-600 hover:text-blue-800 font-medium">
                +91 55555 55555
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">💊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pharmacy</h3>
              <p className="text-gray-600 text-sm mb-3">Medicine & Prescriptions</p>
              <a href="tel:+914444444444" className="text-blue-600 hover:text-blue-800 font-medium">
                +91 44444 44444
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Billing</h3>
              <p className="text-gray-600 text-sm mb-3">Payment & Insurance</p>
              <a href="tel:+913333333333" className="text-blue-600 hover:text-blue-800 font-medium">
                +91 33333 33333
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Directions & Transportation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Here</h2>
            <p className="text-gray-600">Transportation options and directions to reach our hospital</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">By Car</h3>
              <p className="text-gray-600 mb-4">
                Free parking available on premises. Located near major highways with easy access from all parts of the city.
              </p>
              <p className="text-sm text-blue-600">🅿️ 200+ Parking Spaces</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Public Transport</h3>
              <p className="text-gray-600 mb-4">
                Multiple bus routes and metro connectivity. Hospital shuttle service available from major transport hubs.
              </p>
              <p className="text-sm text-green-600">🚌 Bus Routes: 45, 67, 89</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Landmarks</h3>
              <p className="text-gray-600 mb-4">
                Near City Mall, opposite Medical College. Look for the distinctive blue building with the hospital sign.
              </p>
              <p className="text-sm text-yellow-600">🏢 Blue Building, Corner Location</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
