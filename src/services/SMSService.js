// Real SMS OTP Service Integration
// eslint-disable-next-line no-unused-vars
const TWILIO_CONFIG = {
  accountSid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
  authToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.REACT_APP_TWILIO_PHONE_NUMBER
};

// Alternative: MSG91 (Popular in India)
const MSG91_CONFIG = {
  authKey: process.env.REACT_APP_MSG91_AUTH_KEY,
  templateId: process.env.REACT_APP_MSG91_TEMPLATE_ID,
  senderId: process.env.REACT_APP_MSG91_SENDER_ID
};

class SMSService {
  static async sendOTP(mobileNumber, otp) {
    try {
      // Using MSG91 (Popular in India)
      const response = await fetch('https://api.msg91.com/api/v5/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authkey': MSG91_CONFIG.authKey
        },
        body: JSON.stringify({
          template_id: MSG91_CONFIG.templateId,
          mobile: mobileNumber,
          authkey: MSG91_CONFIG.authKey,
          otp: otp,
          sender: MSG91_CONFIG.senderId,
          message: `Your OTP for Jagjeevan Hospital login is ${otp}. Valid for 5 minutes. Do not share with anyone.`
        })
      });

      const data = await response.json();
      return { success: true, messageId: data.request_id };
    } catch (error) {
      console.error('SMS Error:', error);
      return { success: false, error: error.message };
    }
  }

  static async verifyOTP(mobileNumber, otp) {
    try {
      const response = await fetch('https://api.msg91.com/api/v5/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authkey': MSG91_CONFIG.authKey
        },
        body: JSON.stringify({
          mobile: mobileNumber,
          otp: otp,
          authkey: MSG91_CONFIG.authKey
        })
      });

      const data = await response.json();
      return { success: data.type === 'success', data };
    } catch (error) {
      console.error('OTP Verification Error:', error);
      return { success: false, error: error.message };
    }
  }
}

export default SMSService;
