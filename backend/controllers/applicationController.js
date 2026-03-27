const Application = require('../models/Application');
const Job = require('../models/Job');
const { sendSuccess, sendError } = require('../utils/response');


// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (jobseeker)
const applyForJob = async (req, res, next) => {
  try {

    if (req.user.role !== 'jobseeker') {
      return sendError(res, 'Only jobseekers can apply for jobs', 403);
    }

    const { job, coverLetter } = req.body;

    const jobDoc = await Job.findById(job);

    if (!jobDoc || !jobDoc.isActive) {
      return sendError(res, 'Job not found or inactive', 404);
    }

    // prevent duplicate applications
    const existing = await Application.findOne({
      job,
      applicant: req.user.id
    });

    if (existing) {
      return sendError(res, 'You have already applied for this job', 409);
    }

    // get resume from multer upload
    const resumePath = req.file ? req.file.path : null;

    const application = await Application.create({
      job,
      applicant: req.user.id,
      coverLetter,
      resume: resumePath
    });

    return sendSuccess(
      res,
      application,
      'Application submitted successfully',
      201
    );

  } catch (error) {
    next(error);
  }
};


// @desc    Get applications
// @route   GET /api/applications
// @access  Private
const getApplications = async (req, res, next) => {
  try {

    let applications;

    if (req.user.role === 'employer') {

      console.log("Employer:", req.user.id);

      const jobs = await Job.find({ postedBy: req.user.id });
      console.log("Employer Jobs:", jobs);

      console.log("Employer:", req.user.id);

      const jobIds = jobs.map(job => job._id);
      console.log("Job IDs:", jobIds);

      applications = await Application.find({ job: { $in: jobIds } })
        .populate('job', 'title company location')
        .populate('applicant', 'name email')
        .sort({ createdAt: -1 });

    } else {

      applications = await Application.find({ applicant: req.user.id })
        .populate('job', 'title company location')
        .sort({ createdAt: -1 });

    }

    return sendSuccess(res, applications, 'Applications fetched successfully');

  } catch (error) {
    next(error);
  }
};


// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private (employer)
const updateApplicationStatus = async (req, res, next) => {
  try {

    if (req.user.role !== 'employer') {
      return sendError(res, 'Only employers can update application status', 403);
    }

    const { status } = req.body;

    const validStatuses = [
      'applied',
      'shortlisted',
      'rejected',
      'hired'
    ];

    if (!validStatuses.includes(status)) {
      return sendError(res, `Invalid status. Valid values: ${validStatuses.join(', ')}`, 400);
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    application.status = status;

    await application.save();

    return sendSuccess(res, application, `Application status updated to "${status}"`);

  } catch (error) {
    next(error);
  }
};

const getApplicationsByJob = async (req, res) => {
  try {

    const applications = await Application.find({
      job: req.params.jobId
    })
      .populate("applicant", "name email")
      .populate("job", "title");

    res.json({
      success: true,
      data: applications
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = {
  applyForJob,
  getApplications,
  updateApplicationStatus,
  getApplicationsByJob
};