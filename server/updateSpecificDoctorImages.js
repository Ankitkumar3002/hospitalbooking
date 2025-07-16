const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
const User = require('./models/User');
require('dotenv').config();

const updateSpecificDoctorImages = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jagjeevan_hospital');
    console.log('Connected to MongoDB');

    // Find Dr. Meera Reddy and update with a professional female doctor image
    const meeraUser = await User.findOne({ 
      firstName: { $regex: /meera/i },
      lastName: { $regex: /reddy/i }
    });

    if (meeraUser) {
      await Doctor.findOneAndUpdate(
        { user: meeraUser._id },
        { 
          profileImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
        }
      );
      console.log('Updated Dr. Meera Reddy with professional female doctor image');
    }

    // Find Dr. Suresh Gupta and update with a professional male doctor image
    const sureshUser = await User.findOne({ 
      firstName: { $regex: /suresh/i },
      lastName: { $regex: /gupta/i }
    });

    if (sureshUser) {
      await Doctor.findOneAndUpdate(
        { user: sureshUser._id },
        { 
          profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
        }
      );
      console.log('Updated Dr. Suresh Gupta with professional male doctor image');
    }

    console.log('Specific doctor images updated successfully!');
    
    // Verify the updates
    const doctors = await Doctor.find().populate('user', 'firstName lastName');
    console.log('\nUpdated doctor images:');
    for (let doctor of doctors) {
      if (doctor.user.firstName.toLowerCase().includes('meera') || 
          doctor.user.firstName.toLowerCase().includes('suresh')) {
        console.log(`Dr. ${doctor.user.firstName} ${doctor.user.lastName}:`);
        console.log(`New image: ${doctor.profileImage}`);
        console.log('');
      }
    }

    process.exit(0);

  } catch (error) {
    console.error('Error updating doctor images:', error);
    process.exit(1);
  }
};

updateSpecificDoctorImages();
