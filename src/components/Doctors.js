import React, { useState } from 'react';
import { StarIcon, MapPinIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data for demonstration
  const mockDoctors = [
    { 
      id: 1, 
      name: "Dr. Meera Reddy", 
      specialization: "Cardiologist", 
      experience: "15 years", 
      rating: 4.8,
      profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      id: 2, 
      name: "Dr. Sunita Gupta", 
      specialization: "Orthopedic Surgeon", 
      experience: "12 years", 
      rating: 4.7,
      profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      id: 3, 
      name: "Dr. Priya Sharma", 
      specialization: "Pediatrician", 
      experience: "10 years", 
      rating: 4.9,
      profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      id: 4, 
      name: "Dr. Anita Patel", 
      specialization: "Neurologist", 
      experience: "18 years", 
      rating: 4.6,
      profileImage: "https://images.unsplash.com/photo-1594824720804-fe500bb36218?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      id: 5, 
      name: "Dr. Kavya Nair", 
      specialization: "Gynecologist", 
      experience: "8 years", 
      rating: 4.8,
      profileImage: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      id: 6, 
      name: "Dr. Rashika Kumar", 
      specialization: "General Surgeon", 
      experience: "20 years", 
      rating: 4.7,
      profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      id: 7, 
      name: "Dr. Suneet Gupta", 
      specialization: "Cardiologist", 
      experience: "15 years", 
      rating: 4.8,
      profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];
  
  const doctors = mockDoctors;
  const loading = false;
  const error = null;
  
  // Mock specializations data
  const specializations = [
    'Cardiology',
    'Dermatology', 
    'Pediatrics',
    'Orthopedics',
    'Neurology',
    'General Medicine'
  ];

  // Helper function to safely get doctor name
  const getDoctorName = (doctor) => {
    // Check if doctor has user with firstName/lastName
    if (doctor.user?.firstName && doctor.user?.lastName) {
      return `${doctor.user.firstName} ${doctor.user.lastName}`;
    }
    // Check if doctor has user with fullName
    if (doctor.user?.fullName && doctor.user.fullName !== 'undefined undefined') {
      return doctor.user.fullName;
    }
    // Check if doctor has name directly
    if (doctor.name) {
      return doctor.name;
    }
    // Extract name from biography if available
    if (doctor.biography) {
      const match = doctor.biography.match(/Dr\.\s+([A-Za-z\s]+)/);
      if (match) {
        return match[1].trim();
      }
    }
    // Fallback
    return `Doctor ${doctor.specialization || 'Specialist'}`;
  };

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor => {
    const searchLower = searchTerm.toLowerCase();
    const doctorName = getDoctorName(doctor);
    const specialization = doctor.specialization || '';
    
    return doctorName.toLowerCase().includes(searchLower) ||
           specialization.toLowerCase().includes(searchLower);
  });

  const handleSpecializationChange = (specialization) => {
    setSelectedSpecialization(specialization);
    setCurrentPage(1);
    refetch({
      page: 1,
      ...(specialization && { specialization })
    });
  };

  const formatWorkingHours = (workingHours) => {
    if (!workingHours) return 'Schedule not available';
    
    const workingDays = Object.entries(workingHours)
      .filter(([day, schedule]) => schedule.isWorking)
      .map(([day, schedule]) => ({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        time: `${schedule.start}-${schedule.end}`
      }));

    if (workingDays.length === 0) return 'Not available';
    
    // Group consecutive days with same timing
    if (workingDays.length >= 5 && 
        workingDays.slice(0, 5).every(d => d.time === workingDays[0].time)) {
      return `Mon-Fri: ${workingDays[0].time}`;
    }
    
    return workingDays.slice(0, 2).map(d => `${d.day}: ${d.time}`).join(', ');
  };

  if (loading) {
    return (
      <section id="doctors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading our expert doctors...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="doctors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600">Error loading doctors: {error}</p>
              <button 
                onClick={() => refetch()}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of highly qualified medical professionals is dedicated to providing 
            exceptional healthcare services with years of experience and specialized expertise.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search doctors by name or specialization..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Specialization Filter */}
            <div className="md:w-64">
              <select
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={selectedSpecialization}
                onChange={(e) => handleSpecializationChange(e.target.value)}
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              {/* Doctor Image */}
              <div className="relative overflow-hidden">
                <img
                  src={doctor.profileImage || `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`}
                  alt={`Dr. ${getDoctorName(doctor)}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {doctor.specialization}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium text-gray-900">
                    {doctor.rating?.average?.toFixed(1) || '4.5'}
                  </span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Dr. {getDoctorName(doctor)}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {doctor.education?.[0] ? 
                    `${doctor.education[0].degree} from ${doctor.education[0].institution}` :
                    `${doctor.experience} years of experience`
                  }
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {doctor.experience} years
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    Room {doctor.roomNumber || 'TBA'}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-900 mb-1">Availability:</div>
                  <div className="text-sm text-gray-600">
                    {formatWorkingHours(doctor.workingHours)}
                  </div>
                </div>

                {/* Consultation Fee */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-900 mb-1">Consultation Fee:</div>
                  <div className="text-sm text-primary-600 font-semibold">
                    ₹{doctor.consultationFee}
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-900 mb-2">Specializations:</div>
                  <div className="flex flex-wrap gap-1">
                    {(doctor.subSpecializations || [doctor.specialization]).slice(0, 3).map((spec, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // TODO: Implement appointment booking modal
                      alert(`Book appointment with Dr. ${getDoctorName(doctor)}`);
                    }}
                    className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition duration-300 font-medium"
                  >
                    Book Appointment
                  </button>
                  <button 
                    onClick={() => {
                      // TODO: Implement doctor profile modal
                      alert(`View profile of Dr. ${getDoctorName(doctor)}`);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300 font-medium"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                    refetch({ page: currentPage - 1, ...(selectedSpecialization && { specialization: selectedSpecialization }) });
                  }
                }}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Previous
              </button>
              
              {[...Array(pagination.totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => {
                    setCurrentPage(index + 1);
                    refetch({ page: index + 1, ...(selectedSpecialization && { specialization: selectedSpecialization }) });
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => {
                  if (currentPage < pagination.totalPages) {
                    setCurrentPage(currentPage + 1);
                    refetch({ page: currentPage + 1, ...(selectedSpecialization && { specialization: selectedSpecialization }) });
                  }
                }}
                disabled={currentPage === pagination.totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === pagination.totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredDoctors.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              No doctors found matching your criteria
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialization('');
                refetch({ page: 1 });
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find the Right Doctor?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our patient care coordinators are here to help you find the perfect doctor for your specific needs. 
              Contact us and we'll match you with the right specialist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+918382817274"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition duration-300 font-medium"
              >
                Call Us: +91 8382817274
              </a>
              <a
                href="#contact"
                className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition duration-300 font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
