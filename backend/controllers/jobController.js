const Job = require('../models/Job');
const { sendSuccess, sendError } = require('../utils/response');

// @desc    Get all active jobs
// @route   GET /api/jobs
// @access  Public
const getAllJobs = async (req, res, next) => {
  try {
    const { keyword, location, type, experience, page = 1, limit = 10 } = req.query;

    const filter = { isActive: true };
    if (keyword) {
      filter.$text = { $search: keyword };
    }
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (type) filter.type = type;
    if (experience) filter.experience = experience;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    return sendSuccess(res, { total, page: Number(page), limit: Number(limit), jobs }, 'Jobs fetched successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    if (!job) {
      return sendError(res, 'Job not found', 404);
    }
    return sendSuccess(res, job, 'Job fetched successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job listing
// @route   POST /api/jobs
// @access  Private (employer only)
const createJob = async (req, res, next) => {
  try {


    if (req.user.role !== 'employer') {
      return sendError(res, 'Only employers can post jobs', 403);
    }
    const logo = req.file ? req.file.path : "";


    const jobData = {
      ...req.body,
      logo,
      postedBy: req.user.id
    };

    const job = await Job.create(jobData);

    return sendSuccess(res, job, 'Job created successfully', 201);

  } catch (error) {
    next(error);
  }
};

// @desc    Update a job listing
// @route   PUT /api/jobs/:id
// @access  Private (employer who posted it)
const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return sendError(res, 'Job not found', 404);
    }

    // Only the employer who posted the job can update it
    if (job.postedBy.toString() !== req.user.id.toString()) {
      return sendError(res, 'Not authorized to update this job', 403);
    }
    if (!job.isActive) {
  return sendError(res, 'Cannot update an inactive job', 400);
}

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('postedBy', 'name email');

    return sendSuccess(res, updatedJob, 'Job updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job listing
// @route   DELETE /api/jobs/:id
// @access  Private (employer who posted it)
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return sendError(res, 'Job not found', 404);
    }

    // Only the employer who posted the job can delete it
    if (job.postedBy.toString() !== req.user.id.toString()) {
      return sendError(res, 'Not authorized to delete this job', 403);
    }

    // Soft delete instead of removing document
    job.isActive = false;
    await job.save();

    return sendSuccess(res, null, 'Job deleted successfully');
  } catch (error) {
    next(error);
  }
};

// @desc Get jobs posted by employer
// @route GET /api/jobs/my-jobs
// @access Private (Employer)
  
const getMyJobs = async (req, res, next) => {
  try {

    if (req.user.role !== "employer") {
      return sendError(res, "Only employers can access this", 403);
    }

    const jobs = await Job.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 });

    return sendSuccess(res, { jobs }, "Employer jobs fetched");

  } catch (error) {
    next(error);
  }
};
module.exports = { getAllJobs, getJobById, createJob, updateJob, deleteJob,getMyJobs};
