import React from 'react';

function DoctorsPage() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Meera Reddy",
      specialization: "Cardiologist",
      experience: "15 years",
      qualification: "MBBS, MD, DM (Cardiology)",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.9,
      consultationFee: 800,
      availability: "Mon-Fri: 9:00 AM - 5:00 PM",
      about: "Dr. Meera Reddy is a highly experienced cardiologist specializing in interventional cardiology and heart disease prevention. She has performed over 5000 cardiac procedures and is known for her patient-centered approach.",
      languages: ["English", "Hindi", "Telugu"]
    },
    {
      id: 2,
      name: "Dr. Sunita Gupta",
      specialization: "Orthopedic Surgeon",
      experience: "12 years",
      qualification: "MBBS, MS (Orthopedics), MCh",
      image: "https://images.unsplash.com/photo-1594824884569-dee8ecafe4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.8,
      consultationFee: 700,
      availability: "Mon-Sat: 10:00 AM - 6:00 PM",
      about: "Dr. Sunita Gupta is a renowned orthopedic surgeon with expertise in joint replacement surgery, sports medicine, and trauma care. She has successfully performed over 3000 surgeries with excellent outcomes and is known for her precision and patient care.",
      languages: ["English", "Hindi", "Punjabi"]
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialization: "Pediatrician",
      experience: "10 years",
      qualification: "MBBS, MD (Pediatrics)",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.9,
      consultationFee: 600,
      availability: "Mon-Fri: 8:00 AM - 4:00 PM",
      about: "Dr. Priya Sharma is a dedicated pediatrician with special interest in child development, immunizations, and pediatric emergencies. She is known for her gentle approach with children and comprehensive care.",
      languages: ["English", "Hindi", "Marathi"]
    },
    {
      id: 4,
      name: "Dr. Anita Patel",
      specialization: "Neurologist",
      experience: "18 years",
      qualification: "MBBS, MD, DM (Neurology)",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.7,
      consultationFee: 900,
      availability: "Tue-Sat: 11:00 AM - 7:00 PM",
      about: "Dr. Anita Patel is a highly skilled neurologist specializing in stroke care, epilepsy treatment, and movement disorders. She has extensive experience in neurological rehabilitation and is recognized for her compassionate patient care and innovative treatment approaches.",
      languages: ["English", "Hindi", "Gujarati"]
    },
    {
      id: 5,
      name: "Dr. Kavya Nair",
      specialization: "Gynecologist",
      experience: "14 years",
      qualification: "MBBS, MS (Obstetrics & Gynecology)",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.8,
      consultationFee: 650,
      availability: "Mon-Sat: 9:00 AM - 5:00 PM",
      about: "Dr. Kavya Nair is an experienced gynecologist with expertise in high-risk pregnancies, laparoscopic surgery, and women's health. She is committed to providing comprehensive reproductive health care.",
      languages: ["English", "Hindi", "Malayalam"]
    },
    {
      id: 6,
      name: "Dr. Rashika Kumar",
      specialization: "General Surgeon",
      experience: "20 years",
      qualification: "MBBS, MS (Surgery), MCh",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.9,
      consultationFee: 750,
      availability: "Mon-Fri: 7:00 AM - 3:00 PM",
      about: "Dr. Rashika Kumar is a senior general surgeon with extensive experience in minimally invasive surgery, trauma care, and emergency procedures. She has performed over 8000 surgeries with excellent success rates and is known for her surgical expertise and dedication to patient safety.",
      languages: ["English", "Hindi", "Bengali"]
    },
    {
      id: 7,
      name: "Dr. Suneet Gupta",
      specialization: "Cardiologist",
      experience: "15 years",
      qualification: "MBBS, MD (Cardiology), DM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.8,
      consultationFee: 800,
      availability: "Mon-Sat: 9:00 AM - 5:00 PM",
      about: "Dr. Suneet Gupta is a renowned cardiologist with expertise in interventional cardiology, cardiac catheterization, and heart disease prevention. He has successfully treated thousands of patients with complex cardiac conditions and is known for his patient-centered approach and clinical excellence.",
      languages: ["English", "Hindi", "Punjabi"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Our Expert Doctors</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Meet our team of highly qualified and experienced medical professionals dedicated to your health and well-being
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">{doctor.rating}</span>
                    </div>
                  </div>
                  <p className="text-blue-600 font-medium mb-1">{doctor.specialization}</p>
                  <p className="text-gray-600 text-sm mb-2">{doctor.qualification}</p>
                  <p className="text-gray-600 text-sm mb-4">{doctor.experience} experience</p>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">{doctor.about}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.map((lang, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Availability:</p>
                    <p className="text-sm text-gray-600">{doctor.availability}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Consultation Fee</p>
                      <p className="text-lg font-semibold text-green-600">₹{doctor.consultationFee}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Doctors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Doctors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our medical professionals are committed to providing the highest quality care with expertise and compassion
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Board Certified</h3>
              <p className="text-gray-600 text-sm">
                All our doctors are board-certified specialists with proven expertise in their fields.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Continuous Learning</h3>
              <p className="text-gray-600 text-sm">
                Our doctors stay updated with latest medical advances through continuous education.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Care</h3>
              <p className="text-gray-600 text-sm">
                We prioritize patient comfort and satisfaction in every interaction and treatment.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Technology</h3>
              <p className="text-gray-600 text-sm">
                Our doctors use state-of-the-art equipment for accurate diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DoctorsPage;
