const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
const User = require('./models/User');
require('dotenv').config();

const updateDoctorImages = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jagjeevan_hospital');
    console.log('Connected to MongoDB');

    // Find all doctors with their user details
    const doctors = await Doctor.find().populate('user', 'firstName lastName email');
    
    console.log('Found doctors:');
    doctors.forEach((doctor, index) => {
      console.log(`${index + 1}. Dr. ${doctor.user.firstName} ${doctor.user.lastName} - ${doctor.specialization}`);
      console.log(`   Current image: ${doctor.profileImage || 'No image'}`);
      console.log('');
    });

    // Update Dr. Meera Reddy's image (assuming she's a gynecologist/pediatrician)
    const meeraReddy = await Doctor.findOne().populate('user').then(async () => {
      const user = await User.findOne({ 
        $or: [
          { firstName: { $regex: /meera/i } },
          { lastName: { $regex: /reddy/i } }
        ]
      });
      if (user) {
        return await Doctor.findOne({ user: user._id }).populate('user');
      }
      return null;
    });

    if (meeraReddy) {
      console.log(`Found Dr. ${meeraReddy.user.firstName} ${meeraReddy.user.lastName}`);
      await Doctor.findByIdAndUpdate(meeraReddy._id, {
        profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      });
      console.log('Updated Dr. Meera Reddy\'s profile image');
    }

    // Update Dr. Suresh Gupta's image
    const sureshGupta = await Doctor.findOne().populate('user').then(async () => {
      const user = await User.findOne({ 
        $or: [
          { firstName: { $regex: /suresh/i } },
          { lastName: { $regex: /gupta/i } }
        ]
      });
      if (user) {
        return await Doctor.findOne({ user: user._id }).populate('user');
      }
      return null;
    });

    if (sureshGupta) {
      console.log(`Found Dr. ${sureshGupta.user.firstName} ${sureshGupta.user.lastName}`);
      await Doctor.findByIdAndUpdate(sureshGupta._id, {
        profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      });
      console.log('Updated Dr. Suresh Gupta\'s profile image');
    }

    console.log('Doctor images updated successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error updating doctor images:', error);
    process.exit(1);
  }
};

updateDoctorImages();
