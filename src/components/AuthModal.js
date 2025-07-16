import React, { useState } from 'react';

function AuthModal({ isOpen, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    otp: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendOtp = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // For demo purposes, simulate API call
      setTimeout(() => {
        setShowOtpVerification(true);
        setSuccessMessage('OTP sent successfully! Demo OTP: 123456');
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const verifyOtpAndResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (formData.newPassword !== formData.confirmNewPassword) {
        setError('New passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.newPassword.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      // For demo purposes, accept OTP 123456
      if (formData.otp !== '123456') {
        setError('Invalid OTP. Demo OTP is: 123456');
        setLoading(false);
        return;
      }

      // Simulate successful password reset
      setTimeout(() => {
        setSuccessMessage('Password reset successfully! You can now login with your new password.');
        setTimeout(() => {
          resetToLogin();
        }, 2000);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const resetToLogin = () => {
    setShowForgotPassword(false);
    setShowOtpVerification(false);
    setIsLogin(true);
    setError('');
    setSuccessMessage('');
    setFormData({
      username: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      otp: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      const endpoint = isLogin ? '/api/login' : '/api/register';
      const payload = isLogin 
        ? (loginMethod === 'email' 
            ? { email: formData.email, password: formData.password }
            : { mobile: formData.mobile, password: formData.password })
        : { 
            username: formData.username, 
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password 
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Call onLogin callback to update parent component
        if (onLogin) {
          onLogin(data.user);
        }
        
        // Close modal and reset form
        onClose();
        setFormData({
          username: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: '',
          otp: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLoginMethod('email');
    setShowForgotPassword(false);
    setShowOtpVerification(false);
    setError('');
    setSuccessMessage('');
    setFormData({
      username: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      otp: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {showForgotPassword 
                ? 'Reset Password' 
                : showOtpVerification 
                  ? 'Verify OTP' 
                  : (isLogin ? 'Login' : 'Sign Up')}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Forgot Password Form */}
          {showForgotPassword && !showOtpVerification && (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Enter your {loginMethod === 'email' ? 'email address' : 'mobile number'} to receive an OTP for password reset.
              </p>
              
              {/* Reset Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reset Method
                </label>
                <div className="flex space-x-4 mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="resetMethod"
                      value="email"
                      checked={loginMethod === 'email'}
                      onChange={(e) => setLoginMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="resetMethod"
                      value="mobile"
                      checked={loginMethod === 'mobile'}
                      onChange={(e) => setLoginMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Mobile Number</span>
                  </label>
                </div>
              </div>

              {loginMethod === 'email' ? (
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="reset-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="reset-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="reset-mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 9999999999"
                  />
                </div>
              )}

              <button
                onClick={sendOtp}
                disabled={loading || (!formData.email && !formData.mobile)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              <div className="text-center">
                <button
                  onClick={resetToLogin}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {/* OTP Verification Form */}
          {showOtpVerification && (
            <form onSubmit={verifyOtpAndResetPassword} className="space-y-4">
              <p className="text-gray-600 mb-4">
                Enter the OTP sent to your {loginMethod === 'email' ? 'email' : 'mobile number'} and set a new password.
              </p>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  required
                  maxLength="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 6-digit OTP (Demo: 123456)"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  minLength="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>

              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  required
                  minLength="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={loading}
                  className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                >
                  Resend OTP
                </button>
                <button
                  type="button"
                  onClick={resetToLogin}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {/* Main Login/Signup Form */}
          {!showForgotPassword && !showOtpVerification && (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your username"
                    />
                  </div>
                )}

                {/* Login Method Selection */}
                {isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Login Method
                    </label>
                    <div className="flex space-x-4 mb-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="loginMethod"
                          value="email"
                          checked={loginMethod === 'email'}
                          onChange={(e) => setLoginMethod(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="loginMethod"
                          value="mobile"
                          checked={loginMethod === 'mobile'}
                          onChange={(e) => setLoginMethod(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">Mobile Number</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Email Field */}
                {(loginMethod === 'email' || !isLogin) && (
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address {!isLogin ? '' : '*'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required={loginMethod === 'email' || !isLogin}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                )}

                {/* Mobile Field */}
                {(loginMethod === 'mobile' || !isLogin) && (
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number {!isLogin ? '(Optional)' : '*'}
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required={loginMethod === 'mobile'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 9999999999"
                      pattern="[+]?[0-9\s\-]+"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
                </button>
              </form>

              {/* Forgot Password Link */}
              {isLogin && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={toggleMode}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </button>
                </p>
              </div>

              {/* Demo Credentials */}
              {isLogin && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600 font-medium mb-2">Demo Credentials:</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>
                      <p className="font-medium">📧 Email Login:</p>
                      <p>Email: demo@hospital.com</p>
                      <p>Password: demo123</p>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium">📱 Mobile Login:</p>
                      <p>Mobile: +91 9999999999</p>
                      <p>Password: demo123</p>
                    </div>
                    <div className="mt-2 text-blue-600">
                      <p className="font-medium">🔐 Password Reset Demo:</p>
                      <p>Click "Forgot Password?" → Use OTP: 123456</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
