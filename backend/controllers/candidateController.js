const Candidate = require('../models/Candidate');
const { validationResult } = require('express-validator');

const getCandidates = async (req, res) => {
    try {
        const { search, status } = req.query;
        let query = {};

        if (search) {
            const regex = { $regex: search, $options: 'i' };
            query.$or = [{ name: regex }, { email: regex }, { jobTitle: regex }];
        }
        if (status) query.status = status;

        const candidates = await Candidate.find(query).sort({ createdAt: -1 });
        res.status(200).json({ count: candidates.length, candidates });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCandidate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { name, email, phone, jobTitle } = req.body;
        if (await Candidate.findOne({ email })) {
            return res.status(400).json({ success: false, message: 'Candidate already exists' });
        }

        const candidateData = { name, email, phone, jobTitle };
        if (req.file) {
            console.log('CLOUDINARY FILE DATA:', req.file); // Debug log
            candidateData.resumeUrl = req.file.path || req.file.secure_url;
        }

        const candidate = await Candidate.create(candidateData);
        res.status(201).json({ message: 'Candidate referred successfully', candidate });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ message: 'Email already exists' });
        res.status(500).json({ message: error.message });
    }
};

const updateCandidateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Reviewed', 'Hired'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const candidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
        res.status(200).json({ message: `Status updated to ${status}`, candidate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCandidateStats = async (req, res) => {
    try {
        const [total, pending, reviewed, hired] = await Promise.all([
            Candidate.countDocuments(),
            Candidate.countDocuments({ status: 'Pending' }),
            Candidate.countDocuments({ status: 'Reviewed' }),
            Candidate.countDocuments({ status: 'Hired' })
        ]);
        res.status(200).json({ total, pending, reviewed, hired });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCandidates,
    createCandidate,
    updateCandidateStatus,
    deleteCandidate,
    getCandidateStats
};
