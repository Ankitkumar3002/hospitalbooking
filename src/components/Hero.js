import React from 'react';
import { HeartIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-primary-900/90 to-primary-800/80">
          <img
            src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Modern Hospital"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Your Health is Our
              <span className="text-secondary-400 block">Priority</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed">
              Experience world-class healthcare with our dedicated team of medical professionals.
              We provide comprehensive medical services with compassion and excellence.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary-400 mb-2">15+</div>
                <div className="text-gray-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary-400 mb-2">50+</div>
                <div className="text-gray-200">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary-400 mb-2">10K+</div>
                <div className="text-gray-200">Happy Patients</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <HeartIcon className="h-8 w-8 text-secondary-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">24/7 Emergency Care</h3>
              </div>
              <p className="text-gray-200">
                Round-the-clock emergency services with immediate response and care.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-secondary-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Advanced Technology</h3>
              </div>
              <p className="text-gray-200">
                State-of-the-art medical equipment and cutting-edge treatment methods.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <ClockIcon className="h-8 w-8 text-secondary-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Quick Appointments</h3>
              </div>
              <p className="text-gray-200">
                Easy online booking system with minimal waiting time for consultations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;