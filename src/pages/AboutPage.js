import React from 'react';

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About Jagjeevan Hospital</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Providing exceptional healthcare services with compassion and excellence for over two decades
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To provide world-class healthcare services that are accessible, affordable, and compassionate. 
                We are committed to improving the health and well-being of our community through innovative 
                medical practices and exceptional patient care.
              </p>
              <p className="text-gray-600">
                Every patient that walks through our doors is treated with dignity, respect, and receives 
                personalized care tailored to their unique needs.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                To be the leading healthcare provider in the region, recognized for our commitment to 
                excellence in patient care, medical innovation, and community health improvement.
              </p>
              <p className="text-gray-600">
                We envision a future where quality healthcare is accessible to all, and where our 
                hospital serves as a beacon of hope and healing in the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide everything we do and shape our approach to healthcare
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compassion</h3>
              <p className="text-gray-600">
                We treat every patient with empathy, kindness, and understanding, recognizing the human 
                dignity in every person we serve.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest standards in medical care, continuously improving our services 
                and staying current with medical advances.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600">
                We maintain the highest ethical standards in all our interactions, building trust through 
                honesty, transparency, and accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our History</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2000 - Foundation</h3>
                  <p className="text-gray-600">
                    Jagjeevan Hospital was established with a vision to provide quality healthcare 
                    services to the community. Started with 50 beds and a dedicated team of healthcare professionals.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2005 - First Expansion</h3>
                  <p className="text-gray-600">
                    Expanded to 100 beds and introduced specialized departments including Cardiology, 
                    Orthopedics, and Pediatrics to better serve our growing patient base.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2010 - Technology Integration</h3>
                  <p className="text-gray-600">
                    Introduced advanced medical equipment and digital health records system, 
                    enhancing the quality and efficiency of patient care.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2015 - Center of Excellence</h3>
                  <p className="text-gray-600">
                    Achieved recognition as a center of excellence for cardiac care and 
                    established partnerships with leading medical institutions.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2020 - Digital Transformation</h3>
                  <p className="text-gray-600">
                    Launched telemedicine services and online appointment booking system, 
                    making healthcare more accessible during the global pandemic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced leadership team is committed to advancing healthcare excellence and innovation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="/images/leadership/ceo.jpg" 
                alt="Dr. Rajesh Kumar - CEO" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80";
                }}
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Dr. Rajesh Kumar</h3>
              <p className="text-blue-600 mb-2">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm">
                MD, MBA - 25+ years of healthcare leadership experience
              </p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Dr. Priya Sharma - CMO" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80";
                }}
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Dr. Priya Sharma</h3>
              <p className="text-blue-600 mb-2">Chief Medical Officer</p>
              <p className="text-gray-600 text-sm">
                MD, FRCS - Renowned surgeon and healthcare innovator
              </p>
            </div>
            <div className="text-center">
              <img 
                src="/images/leadership/coo.jpg" 
                alt="Mr. Amit Patel - COO" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80";
                }}
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Mr. Amit Patel</h3>
              <p className="text-blue-600 mb-2">Chief Operating Officer</p>
              <p className="text-gray-600 text-sm">
                MBA, Six Sigma Black Belt - Healthcare operations expert
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
