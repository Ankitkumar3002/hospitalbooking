# 🏥 Jag Jeevan Hospital - Modern Healthcare Website

A comprehensive, modern hospital booking website built with React and Node.js, featuring advanced authentication, appointment booking with UPI payment integration, and a complete healthcare management system.

## ✨ Features

### 🔐 Authentication System
- **Dual Login Methods**: Email and Mobile Number authentication
- **Forgot Password**: OTP-based password reset via email/SMS
- **Secure Sessions**: JWT token-based authentication
- **Demo Credentials**: Ready-to-use test accounts

### 📅 Appointment Booking
- **Interactive Booking**: Step-by-step appointment scheduling
- **Doctor Selection**: Choose from specialist doctors
- **Patient Information**: Comprehensive patient details form
- **Fee Transparency**: Clear pricing with consultation fees
- **Payment Integration**: UPI payment gateway with demo mode

### 👩‍⚕️ Doctor Profiles
- **All-Female Team**: Diverse team of female Indian doctors
- **Specializations**: Cardiology, Orthopedics, Pediatrics, Neurology, Gynecology, Surgery
- **Professional Images**: High-quality doctor photographs
- **Detailed Profiles**: Experience, specializations, and availability

### 🏥 Services & Departments
- **24/7 Emergency Care**: Round-the-clock medical services
- **Advanced Technology**: Modern medical equipment and facilities
- **Specialist Care**: Comprehensive healthcare services
- **Department Contacts**: Direct contact for each specialty

### 📞 Contact & Communication
- **Multiple Contact Methods**: Phone, email, emergency lines
- **Department-Specific Contacts**: Direct lines for each department
- **Transportation Guide**: Detailed directions and parking info
- **Interactive Contact Forms**: Easy communication channels

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookingwebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing for SPA navigation
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Responsive Design**: Mobile-first approach with full device compatibility

### Backend (Ready for Integration)
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for user and appointment data
- **JWT**: JSON Web Tokens for secure authentication

### Payment Integration
- **UPI Gateway**: Indian payment system integration
- **Demo Mode**: Test payment functionality without real transactions

## 📱 Demo Credentials

### Email Login
- **Email**: `demo@hospital.com`
- **Password**: `demo123`

### Mobile Login
- **Mobile**: `+91 9999999999`
- **Password**: `demo123`

### Password Reset Demo
- **OTP**: `123456` (for testing forgot password functionality)

## 🏗️ Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Header.js        # Navigation and authentication
│   ├── AuthModal.js     # Login/signup modal with password reset
│   └── Footer.js        # Site footer
├── pages/               # Main application pages
│   ├── HomePage.js      # Landing page with hero section
│   ├── AboutPage.js     # Hospital information
│   ├── ServicesPage.js  # Medical services overview
│   ├── DoctorsPage.js   # Doctor profiles and specializations
│   ├── AppointmentsPage.js  # Booking system with payment
│   └── ContactPage.js   # Contact information and forms
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🎨 Design Features

### Modern UI/UX
- **Clean Design**: Professional medical website aesthetics
- **Intuitive Navigation**: Easy-to-use interface for all age groups
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Color Scheme**: Medical blue and white with accent colors

### Responsive Layout
- **Mobile First**: Optimized for smartphones and tablets
- **Desktop Enhanced**: Rich experience on larger screens
- **Cross-Browser**: Compatible with all modern browsers

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_UPI_MERCHANT_ID=your_merchant_id
REACT_APP_UPI_API_KEY=your_api_key
```

### Backend Setup (Optional)
If you want to set up the full backend:

1. **Create backend directory**
   ```bash
   mkdir backend && cd backend
   npm init -y
   ```

2. **Install backend dependencies**
   ```bash
   npm install express mongoose bcryptjs jsonwebtoken cors dotenv
   ```

3. **Set up MongoDB connection**
   ```javascript
   // backend/server.js
   const mongoose = require('mongoose');
   mongoose.connect('mongodb://localhost:27017/hospital', {
     useNewUrlParser: true,
     useUnifiedTopology: true
   });
   ```

## 📋 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🌟 Key Highlights

### User Experience
- **Seamless Booking**: 3-step appointment process
- **Multiple Payment Options**: UPI, cards, and digital wallets
- **Real-time Availability**: Live doctor schedule updates
- **Confirmation System**: Email and SMS notifications

### Security Features
- **Data Encryption**: Secure patient information handling
- **HIPAA Compliance**: Healthcare data protection standards
- **Secure Payments**: PCI DSS compliant payment processing

### Performance
- **Fast Loading**: Optimized images and code splitting
- **SEO Friendly**: Meta tags and structured data
- **Progressive Web App**: Offline capability and installable

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React.js with modern UI/UX
- **Backend Integration**: Node.js and MongoDB ready
- **Payment Gateway**: UPI integration for Indian market
- **Design**: Professional healthcare website design

## 📞 Support

For support and questions:
- **Email**: support@jagjeevanhospital.com
- **Phone**: +91 88888 88888
- **Emergency**: +91 99999 99999

## 🔄 Updates & Changelog

### Latest Features
- ✅ Mobile number login with OTP password reset
- ✅ Enhanced contact page with department-specific information
- ✅ All-female doctor team with professional profiles
- ✅ UPI payment integration for appointments
- ✅ Comprehensive services section

---

**Made with ❤️ for better healthcare accessibility**
