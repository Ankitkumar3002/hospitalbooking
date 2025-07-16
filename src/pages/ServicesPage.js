import React from 'react';

function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Emergency Care",
      description: "24/7 emergency medical services with state-of-the-art trauma center and highly trained emergency physicians.",
      icon: "🚨",
      features: ["24/7 Availability", "Trauma Center", "Emergency Surgery", "Critical Care"]
    },
    {
      id: 2,
      title: "Cardiology",
      description: "Comprehensive heart care including diagnostics, interventional procedures, and cardiac rehabilitation.",
      icon: "❤️",
      features: ["Cardiac Catheterization", "ECG & Echo", "Heart Surgery", "Pacemaker Implantation"]
    },
    {
      id: 3,
      title: "Orthopedics",
      description: "Advanced bone and joint care with modern surgical techniques and rehabilitation programs.",
      icon: "🦴",
      features: ["Joint Replacement", "Sports Medicine", "Spine Surgery", "Arthroscopy"]
    },
    {
      id: 4,
      title: "Neurology",
      description: "Expert neurological care for brain, spine, and nervous system disorders with advanced diagnostics.",
      icon: "🧠",
      features: ["Brain Surgery", "Stroke Care", "Epilepsy Treatment", "Neuroimaging"]
    },
    {
      id: 5,
      title: "Pediatrics",
      description: "Specialized medical care for infants, children, and adolescents with child-friendly environment.",
      icon: "👶",
      features: ["Newborn Care", "Vaccinations", "Pediatric Surgery", "Growth Monitoring"]
    },
    {
      id: 6,
      title: "Maternity",
      description: "Complete maternal and newborn care with modern labor rooms and NICU facilities.",
      icon: "🤱",
      features: ["Prenatal Care", "Natural Delivery", "C-Section", "NICU"]
    },
    {
      id: 7,
      title: "Oncology",
      description: "Comprehensive cancer care with advanced treatment options and support services.",
      icon: "🎗️",
      features: ["Chemotherapy", "Radiation Therapy", "Surgical Oncology", "Palliative Care"]
    },
    {
      id: 8,
      title: "Gastroenterology",
      description: "Expert digestive system care with advanced endoscopic procedures and treatments.",
      icon: "🫃",
      features: ["Endoscopy", "Colonoscopy", "Liver Care", "IBD Treatment"]
    },
    {
      id: 9,
      title: "Pulmonology",
      description: "Specialized respiratory care for lung diseases and breathing disorders.",
      icon: "🫁",
      features: ["Bronchoscopy", "Sleep Studies", "Asthma Care", "COPD Management"]
    },
    {
      id: 10,
      title: "Dermatology",
      description: "Complete skin care services including medical and cosmetic dermatology treatments.",
      icon: "✨",
      features: ["Skin Cancer Screening", "Cosmetic Procedures", "Acne Treatment", "Psoriasis Care"]
    },
    {
      id: 11,
      title: "Ophthalmology",
      description: "Advanced eye care services with modern equipment for comprehensive vision health.",
      icon: "👁️",
      features: ["Cataract Surgery", "Retinal Care", "Glaucoma Treatment", "LASIK"]
    },
    {
      id: 12,
      title: "Radiology",
      description: "State-of-the-art imaging services for accurate diagnosis and treatment planning.",
      icon: "📷",
      features: ["MRI", "CT Scan", "Ultrasound", "X-Ray"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Our Medical Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive healthcare services delivered by experienced specialists using advanced medical technology
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Healthcare Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From emergency care to specialized treatments, we provide a full range of medical services 
              to meet all your healthcare needs under one roof.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Key Services:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence in healthcare is reflected in every service we provide
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Experienced Team</h3>
              <p className="text-gray-600">
                Board-certified physicians and specialists with years of experience in their respective fields.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Technology</h3>
              <p className="text-gray-600">
                State-of-the-art medical equipment and cutting-edge technology for accurate diagnosis and treatment.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                Round-the-clock emergency services and critical care for urgent medical needs.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient-Centered Care</h3>
              <p className="text-gray-600">
                Personalized treatment plans and compassionate care focused on patient comfort and recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Excellence in Healthcare</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our comprehensive medical services are designed to provide you with the highest quality healthcare. 
              Each department is equipped with state-of-the-art technology and staffed by experienced specialists.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">24/7 Emergency Care</h3>
                <p className="text-blue-100">Round-the-clock emergency services for urgent medical needs</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Advanced Technology</h3>
                <p className="text-blue-100">State-of-the-art medical equipment and modern facilities</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👩‍⚕️</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Expert Specialists</h3>
                <p className="text-blue-100">Experienced doctors and healthcare professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
