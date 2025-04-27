// backend/routes/blogRoutes.js
const express = require("express");
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  likeBlog,
} = require("../controllers/blogController");

const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

// Base routes
router.route("/").get(getBlogs).post(protect, authorize("admin"), createBlog);

router
  .route("/:id")
  .get(getBlog)
  .put(protect, authorize("admin"), updateBlog)
  .delete(protect, authorize("admin"), deleteBlog);

// Comment routes
router.route("/:id/comments").post(protect, addComment);

// Like routes
router.route("/:id/like").put(protect, likeBlog);

module.exports = router;
