const Blog = require("../models/Blog");
const User = require("../models/User");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = asyncHandler(async (req, res, next) => {
  // Enable pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Blog.countDocuments();

  const blogs = await Blog.find()
    .populate({
      path: "author",
      select: "name",
    })
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit);

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: blogs.length,
    pagination,
    total,
    data: blogs,
  });
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
    .populate({
      path: "author",
      select: "name",
    })
    .populate({
      path: "comments.user",
      select: "name",
    });

  if (!blog) {
    return next(
      new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
    );
  }

  // Increment view count
  blog.views += 1;
  await blog.save();

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.author = req.user.id;

  // Check for admin role
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Only admins can create blog posts", 403));
  }

  const blog = await Blog.create(req.body);

  res.status(201).json({
    success: true,
    data: blog,
  });
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = asyncHandler(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(
      new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is blog owner or admin
  if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this blog`,
        401
      )
    );
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(
      new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is blog owner or admin
  if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this blog`,
        401
      )
    );
  }

  await Blog.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(
      new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
    );
  }

  const newComment = {
    user: req.user.id,
    name: req.user.name,
    comment: req.body.comment,
  };

  blog.comments.unshift(newComment);

  await blog.save();

  res.status(201).json({
    success: true,
    data: blog.comments,
  });
});

// @desc    Like blog
// @route   PUT /api/blogs/:id/like
// @access  Private
exports.likeBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(
      new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if the blog has already been liked by this user
  if (blog.likedBy.some((userId) => userId.toString() === req.user.id)) {
    // Unlike the blog - remove user from likedBy array
    blog.likedBy = blog.likedBy.filter(
      (userId) => userId.toString() !== req.user.id
    );
    blog.likes = blog.likedBy.length;
    await blog.save();

    return res.status(200).json({
      success: true,
      liked: false,
      likes: blog.likes,
      data: blog,
    });
  }

  // Like the blog - add user to likedBy array
  blog.likedBy.push(req.user.id);
  blog.likes = blog.likedBy.length;
  await blog.save();

  res.status(200).json({
    success: true,
    liked: true,
    likes: blog.likes,
    data: blog,
  });
});
