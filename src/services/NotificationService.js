// Real-Time Notification Service
import { io } from 'socket.io-client';

class NotificationService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  // Initialize WebSocket connection
  connect(userId) {
    try {
      this.socket = io(process.env.REACT_APP_SOCKET_URL || 'wss://api.jagjeevan-hospital.com', {
        auth: {
          token: localStorage.getItem('token'),
          userId: userId
        }
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('Connected to notification service');
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('Disconnected from notification service');
      });

      // Listen for appointment updates
      this.socket.on('appointment_confirmed', (data) => {
        this.showNotification('Appointment Confirmed', 
          `Your appointment with ${data.doctorName} is confirmed for ${data.date} at ${data.time}`);
      });

      this.socket.on('appointment_reminder', (data) => {
        this.showNotification('Appointment Reminder', 
          `Your appointment with ${data.doctorName} is in 1 hour`);
      });

      this.socket.on('payment_success', (data) => {
        this.showNotification('Payment Successful', 
          `Payment of ₹${data.amount} processed successfully`);
      });

    } catch (error) {
      console.error('Socket connection error:', error);
    }
  }

  // Browser push notifications
  async requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  showNotification(title, message, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/logo.png',
        badge: '/badge.png',
        ...options
      });
    }
  }

  // SMS Notifications
  async sendSMSNotification(mobile, message) {
    try {
      const response = await fetch('/api/notifications/sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ mobile, message })
      });
      return await response.json();
    } catch (error) {
      console.error('SMS notification error:', error);
    }
  }

  // Email Notifications
  async sendEmailNotification(email, subject, message) {
    try {
      const response = await fetch('/api/notifications/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ email, subject, message })
      });
      return await response.json();
    } catch (error) {
      console.error('Email notification error:', error);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }
}

export default new NotificationService();
