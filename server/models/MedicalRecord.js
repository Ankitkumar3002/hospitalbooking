const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  visitDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  chiefComplaint: {
    type: String,
    required: true,
    maxlength: 500
  },
  historyOfPresentIllness: {
    type: String,
    maxlength: 2000
  },
  pastMedicalHistory: {
    type: String,
    maxlength: 1000
  },
  familyHistory: {
    type: String,
    maxlength: 1000
  },
  socialHistory: {
    smoking: String,
    alcohol: String,
    drugs: String,
    occupation: String,
    lifestyle: String
  },
  allergies: [{
    allergen: String,
    reaction: String,
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe']
    }
  }],
  currentMedications: [{
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date
  }],
  vitalSigns: {
    temperature: Number,
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    heartRate: Number,
    respiratoryRate: Number,
    oxygenSaturation: Number,
    weight: Number,
    height: Number,
    bmi: Number
  },
  physicalExamination: {
    general: String,
    cardiovascular: String,
    respiratory: String,
    gastrointestinal: String,
    neurological: String,
    musculoskeletal: String,
    skin: String,
    other: String
  },
  labResults: [{
    testName: String,
    result: String,
    normalRange: String,
    date: Date,
    notes: String
  }],
  imaging: [{
    type: String,
    bodyPart: String,
    findings: String,
    date: Date,
    reportUrl: String
  }],
  diagnosis: {
    primary: String,
    secondary: [String],
    differential: [String]
  },
  treatment: {
    medications: [{
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String
    }],
    procedures: [{
      name: String,
      date: Date,
      outcome: String,
      notes: String
    }],
    therapy: [{
      type: String,
      duration: String,
      frequency: String,
      provider: String
    }]
  },
  plan: {
    followUp: String,
    referrals: [{
      specialist: String,
      reason: String,
      urgency: String
    }],
    lifestyle: String,
    monitoring: String
  },
  notes: {
    type: String,
    maxlength: 2000
  },
  isConfidential: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
medicalRecordSchema.index({ patient: 1, visitDate: -1 });
medicalRecordSchema.index({ doctor: 1, visitDate: -1 });
medicalRecordSchema.index({ appointment: 1 });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
