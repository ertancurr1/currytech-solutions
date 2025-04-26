const express = require("express");
const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  approveTestimonial,
} = require("../controllers/testimonialController");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(getTestimonials).post(protect, createTestimonial);

router.route("/admin").get(protect, authorize("admin"), getAllTestimonials);

router
  .route("/:id")
  .get(getTestimonial)
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

router
  .route("/:id/approve")
  .put(protect, authorize("admin"), approveTestimonial);

module.exports = router;
