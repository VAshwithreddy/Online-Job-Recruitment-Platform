const { body } = require("express-validator");

exports.createJobValidator = [
  body("title")
    .notEmpty()
    .withMessage("Job title is required"),

  body("description")
    .notEmpty()
    .withMessage("Job description is required"),

  body("company")
    .notEmpty()
    .withMessage("Company name is required"),

  body("location")
    .notEmpty()
    .withMessage("Location is required"),

  body("salary.min")
    .optional()
    .isNumeric()
    .withMessage("Minimum salary must be a number"),

  body("salary.max")
    .optional()
    .isNumeric()
    .withMessage("Maximum salary must be a number"),

  body("type")
    .optional()
    .isIn(["full-time", "part-time", "contract", "internship", "remote"])
    .withMessage("Invalid job type"),

  body("experience")
    .optional()
    .isIn(["fresher", "1-2 years", "3-5 years", "5+ years"])
    .withMessage("Invalid experience level"),

  body("openings")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Openings must be at least 1"),

  body("deadline")
    .optional()
    .isISO8601()
    .withMessage("Deadline must be a valid date")
];