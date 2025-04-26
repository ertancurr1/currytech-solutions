const Testimonial = require("../models/Testimonial");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = asyncHandler(async (req, res, next) => {
  // For public access, only return approved testimonials
  const query = { isApproved: true };

  // Log for debugging
  console.log("Fetching approved testimonials");

  const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });

  // Log for debugging
  console.log(`Found ${testimonials.length} approved testimonials`);

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials,
  });
});

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
exports.getTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(
      new ErrorResponse(
        `Testimonial not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private
exports.createTestimonial = asyncHandler(async (req, res, next) => {
  // Add user ID to req.body
  req.body.user = req.user.id;

  // Log what's being received
  console.log("Creating testimonial with data:", req.body);

  const testimonial = await Testimonial.create(req.body);

  console.log("Testimonial created:", testimonial);

  res.status(201).json({
    success: true,
    data: testimonial,
  });
});

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
exports.updateTestimonial = asyncHandler(async (req, res, next) => {
  let testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(
      new ErrorResponse(
        `Testimonial not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is testimonial owner or admin
  if (
    testimonial.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this testimonial`,
        401
      )
    );
  }

  testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
exports.deleteTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(
      new ErrorResponse(
        `Testimonial not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is testimonial owner or admin
  if (
    testimonial.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this testimonial`,
        401
      )
    );
  }

  // Use deleteOne() instead of remove()
  await Testimonial.deleteOne({ _id: req.params.id });
  // OR await testimonial.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get all testimonials (including unapproved) - Admin Only
// @route   GET /api/testimonials/admin
// @access  Private/Admin
exports.getAllTestimonials = asyncHandler(async (req, res, next) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials,
  });
});

// @desc    Approve testimonial
// @route   PUT /api/testimonials/:id/approve
// @access  Private/Admin
exports.approveTestimonial = asyncHandler(async (req, res, next) => {
  let testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(
      new ErrorResponse(
        `Testimonial not found with id of ${req.params.id}`,
        404
      )
    );
  }

  testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});

// @desc    Get testimonials for current user
// @route   GET /api/testimonials/me
// @access  Private
exports.getUserTestimonials = asyncHandler(async (req, res, next) => {
  // Log for debugging
  console.log("Getting testimonials for user ID:", req.user.id);

  const testimonials = await Testimonial.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  // Log for debugging
  console.log(`Found ${testimonials.length} testimonials for user`);

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials,
  });
});
