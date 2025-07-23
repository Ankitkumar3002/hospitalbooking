// Professional Database Service
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.jagjeevan-hospital.com';

class DatabaseService {
  static async authenticateUser(mobileNumber, otp) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        mobile: mobileNumber,
        otp: otp,
        loginMethod: 'mobile'
      });

      return {
        success: true,
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Authentication failed'
      };
    }
  }

  static async getDoctors(filters = {}) {
    try {
      const response = await axios.get(`${API_BASE_URL}/doctors`, {
        params: filters
      });
      return { success: true, doctors: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async bookAppointment(appointmentData) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, appointment: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }

  static async processPayment(paymentData) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/payments/process`, paymentData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, payment: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }

  static async getUserAppointments(userId) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/appointments/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, appointments: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default DatabaseService;
