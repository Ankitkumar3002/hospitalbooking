// Real-Time Features for Professional Hospital System
import { useState, useEffect } from 'react';
import NotificationService from '../services/NotificationService';
import DatabaseService from '../services/DatabaseService';

export const useRealTimeFeatures = () => {
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [onlineDoctors, setOnlineDoctors] = useState([]);

  useEffect(() => {
    // Initialize real-time connections
    const initializeRealTime = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        // Connect to notification service
        NotificationService.connect(user.id);
        
        // Listen for real-time updates
        NotificationService.socket?.on('appointment_update', (data) => {
          setAppointments(prev => 
            prev.map(apt => apt.id === data.id ? { ...apt, ...data } : apt)
          );
        });

        NotificationService.socket?.on('doctor_status_change', (data) => {
          setOnlineDoctors(data.onlineDoctors);
        });

        NotificationService.socket?.on('new_notification', (data) => {
          setNotifications(prev => [data, ...prev]);
        });
      }
    };

    initializeRealTime();

    return () => {
      NotificationService.disconnect();
    };
  }, []);

  return {
    appointments,
    notifications,
    onlineDoctors,
    setAppointments,
    setNotifications
  };
};

// Professional appointment booking with real-time updates
export const useAppointmentBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bookAppointment = async (appointmentData) => {
    setLoading(true);
    setError('');

    try {
      // 1. Check doctor availability in real-time
      const availabilityCheck = await DatabaseService.checkDoctorAvailability(
        appointmentData.doctorId,
        appointmentData.date,
        appointmentData.time
      );

      if (!availabilityCheck.available) {
        throw new Error('Selected time slot is no longer available');
      }

      // 2. Create appointment
      const appointmentResult = await DatabaseService.bookAppointment(appointmentData);
      
      if (!appointmentResult.success) {
        throw new Error(appointmentResult.error);
      }

      // 3. Process payment
      const paymentResult = await PaymentService.processPayment({
        ...appointmentData,
        appointmentId: appointmentResult.appointment.id
      });

      if (!paymentResult.success) {
        // Cancel appointment if payment fails
        await DatabaseService.cancelAppointment(appointmentResult.appointment.id);
        throw new Error(paymentResult.error);
      }

      // 4. Send confirmations
      await Promise.all([
        // SMS to patient
        NotificationService.sendSMSNotification(
          appointmentData.patientMobile,
          `Appointment confirmed with ${appointmentData.doctorName} on ${appointmentData.date} at ${appointmentData.time}. Booking ID: ${appointmentResult.appointment.id}`
        ),
        
        // Email to patient
        NotificationService.sendEmailNotification(
          appointmentData.patientEmail,
          'Appointment Confirmation - Jagjeevan Hospital',
          generateAppointmentConfirmationEmail(appointmentResult.appointment)
        ),

        // Notification to doctor
        NotificationService.sendNotificationToDoctor(
          appointmentData.doctorId,
          `New appointment booked: ${appointmentData.patientName} on ${appointmentData.date} at ${appointmentData.time}`
        )
      ]);

      return { success: true, appointment: appointmentResult.appointment };

    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { bookAppointment, loading, error };
};

// Generate professional email template
const generateAppointmentConfirmationEmail = (appointment) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
        <h1>Jagjeevan Hospital</h1>
        <h2>Appointment Confirmation</h2>
      </div>
      
      <div style="padding: 20px;">
        <h3>Dear ${appointment.patientName},</h3>
        
        <p>Your appointment has been successfully confirmed with the following details:</p>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Doctor:</strong> ${appointment.doctorName}</p>
          <p><strong>Specialization:</strong> ${appointment.doctorSpecialization}</p>
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Consultation Fee:</strong> ₹${appointment.fee}</p>
          <p><strong>Booking ID:</strong> ${appointment.id}</p>
        </div>
        
        <h4>Important Instructions:</h4>
        <ul>
          <li>Please arrive 15 minutes before your scheduled time</li>
          <li>Bring a valid ID and any previous medical records</li>
          <li>Carry your payment receipt and booking confirmation</li>
          <li>Follow hospital safety protocols</li>
        </ul>
        
        <p>For any queries or to reschedule, please contact us at +91-XXXXXXXXXX</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280;">Thank you for choosing Jagjeevan Hospital</p>
        </div>
      </div>
    </div>
  `;
};

export { generateAppointmentConfirmationEmail };
