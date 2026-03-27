const express = require('express');
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
} = require('../controllers/jobController');

const { createJobValidator } = require("../validators/jobValidator");
const validateRequest = require("../middleware/validateRequest");
const { protect, authorize } = require("../middleware/authMiddleware");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.get("/my-jobs", protect, getMyJobs);

// GET /api/jobs
// POST /api/jobs
router.route('/')
  .get(getAllJobs)
  .post(
    protect,
    authorize("employer"),
    createJobValidator,
    validateRequest,
    createJob
  );


// GET /api/jobs/:id
// PUT /api/jobs/:id
// DELETE /api/jobs/:id
router.route('/:id')
  .get(getJobById)
  .put(protect, authorize("employer"), updateJob)
  .delete(protect, authorize("employer"), deleteJob);

router.post("/", protect, upload.single("logo"), createJob);  

module.exports = router;