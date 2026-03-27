const express = require('express');
const router = express.Router();

const {
  applyForJob,
  getApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');


// Apply for job (Candidate only)
router
  .route('/')
  .post(protect, upload.single('resume'), applyForJob)
  .get(protect, getApplications);


// Update application status (Recruiter)
router
  .route('/:id')
  .put(protect, updateApplicationStatus);


module.exports = router;