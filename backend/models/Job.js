const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },

  description: {
    type: String,
    required: [true, 'Job description is required'],
  },

  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },

  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },

  salary: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
  },

  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
    default: 'full-time',
  },

  skills: [{ type: String }],

  experience: {
    type: String,
    enum: ['fresher', '1-2 years', '3-5 years', '5+ years'],
    default: 'fresher',
  },

  openings: {
    type: Number,
    default: 1,
  },

  deadline: {
    type: Date,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  applicationsCount: {
  type: Number,
  default: 0
}
},
{ timestamps: true }
);

// Indexes for faster search
jobSchema.index({ title: 'text', description: 'text', location: 'text' });
jobSchema.index({ location: 1 });
jobSchema.index({ type: 1 });
jobSchema.index({ experience: 1 });

module.exports = mongoose.model('Job', jobSchema);