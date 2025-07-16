const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
router.post('/register', async (req, res) => {
  try {
    const { username, email, mobile, password, role = 'patient' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email }, 
        { username },
        ...(mobile ? [{ mobile }] : [])
      ] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email, username, or mobile number already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      email,
      mobile,
      password: hashedPassword,
      role
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    // Find user by email or mobile
    const query = email ? { email } : { mobile };
    const user = await User.findOne(query);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Doctor Routes
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().select('-password');
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error fetching doctors' });
  }
});

router.get('/doctors/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-password');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Server error fetching doctor' });
  }
});

// Appointment Routes
router.post('/appointments', authenticateToken, async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, symptoms, notes } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if appointment slot is available
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Appointment slot not available' });
    }

    // Create appointment
    const appointment = new Appointment({
      patient: req.user.userId,
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      symptoms: symptoms || '',
      notes: notes || '',
      status: 'scheduled'
    });

    await appointment.save();

    // Populate doctor and patient info
    await appointment.populate('doctor', 'name specialization');
    await appointment.populate('patient', 'username email');

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error booking appointment' });
  }
});

router.get('/appointments', authenticateToken, async (req, res) => {
  try {
    const query = req.user.role === 'doctor' 
      ? { doctor: req.user.userId } 
      : { patient: req.user.userId };

    const appointments = await Appointment.find(query)
      .populate('doctor', 'name specialization')
      .populate('patient', 'username email')
      .sort({ appointmentDate: 1, appointmentTime: 1 });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error fetching appointments' });
  }
});

router.patch('/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has permission to update
    const canUpdate = req.user.role === 'doctor' && 
                     appointment.doctor.toString() === req.user.userId ||
                     req.user.role === 'patient' && 
                     appointment.patient.toString() === req.user.userId;

    if (!canUpdate) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Update appointment
    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;

    await appointment.save();

    await appointment.populate('doctor', 'name specialization');
    await appointment.populate('patient', 'username email');

    res.json({
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Server error updating appointment' });
  }
});

// Payment Routes
router.post('/payments', authenticateToken, async (req, res) => {
  try {
    const { appointmentId, amount, method } = req.body;

    // Here you would integrate with a payment gateway like Stripe
    // For now, we'll simulate a successful payment
    
    const payment = {
      id: 'pay_' + Date.now(),
      appointmentId,
      amount,
      method,
      status: 'completed',
      createdAt: new Date()
    };

    res.json({
      message: 'Payment processed successfully',
      payment
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Server error processing payment' });
  }
});

// Profile Routes
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

router.patch('/profile', authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password updates through this route

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

module.exports = router;
