// Professional Payment Gateway Integration
import axios from 'axios';

// Razorpay Integration (Popular in India)
class PaymentService {
  static initializeRazorpay() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  static async processPayment(appointmentData) {
    try {
      // Load Razorpay script
      const razorpayLoaded = await this.initializeRazorpay();
      if (!razorpayLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // Create order on backend
      const orderResponse = await axios.post('/api/payments/create-order', {
        amount: appointmentData.fee * 100, // Convert to paise
        currency: 'INR',
        receipt: `appointment_${appointmentData.doctorId}_${Date.now()}`
      });

      const { orderId, amount, currency } = orderResponse.data;

      // Razorpay payment options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'Jagjeevan Hospital',
        description: `Consultation with ${appointmentData.doctorName}`,
        order_id: orderId,
        image: '/logo.png',
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post('/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentData: appointmentData
            });

            return { success: true, paymentData: verifyResponse.data };
          } catch (error) {
            return { success: false, error: error.message };
          }
        },
        prefill: {
          name: appointmentData.patientName,
          email: appointmentData.patientEmail,
          contact: appointmentData.patientMobile
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: () => {
            return { success: false, error: 'Payment cancelled' };
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment Error:', error);
      return { success: false, error: error.message };
    }
  }

  // UPI Payment Integration
  static async processUPIPayment(appointmentData) {
    try {
      const upiId = appointmentData.paymentDetails.upiId;
      const amount = appointmentData.fee;
      
      // Generate UPI payment URL
      const upiUrl = `upi://pay?pa=${upiId}&pn=Jagjeevan Hospital&am=${amount}&cu=INR&tn=Consultation Payment`;
      
      // For mobile devices, redirect to UPI app
      if (this.isMobileDevice()) {
        window.location.href = upiUrl;
      } else {
        // For desktop, show QR code
        this.generateUPIQRCode(upiUrl);
      }

      return { success: true, paymentMethod: 'UPI' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  static generateUPIQRCode(upiUrl) {
    // Implementation for QR code generation
    // Using a library like qrcode.js
    import('qrcode').then(QRCode => {
      QRCode.toCanvas(document.getElementById('qr-canvas'), upiUrl);
    });
  }
}

export default PaymentService;
