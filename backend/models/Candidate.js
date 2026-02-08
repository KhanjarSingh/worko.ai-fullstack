const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 chars']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        match: [/^\d{10}$/, 'Phone must be 10 digits']
    },
    jobTitle: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        minlength: [2, 'Job title too short']
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Hired'],
        default: 'Pending'
    },
    resumeUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
