const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getCandidates, createCandidate, updateCandidateStatus, deleteCandidate, getCandidateStats } = require('../controllers/candidateController');
const { check } = require('express-validator');

router.get('/stats', getCandidateStats);

router.get('/', getCandidates);

router.post('/', upload.single('resume'), [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number must be 10 digits').isLength({ min: 10, max: 10 }),
    check('jobTitle', 'Job title is required').not().isEmpty()
], createCandidate);

router.put('/:id/status', updateCandidateStatus);

router.delete('/:id', deleteCandidate);

module.exports = router;
