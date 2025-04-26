const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Please add testimonial content"],
    trim: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 5"],
  },
  author: {
    name: {
      type: String,
      required: [true, "Please add author name"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://randomuser.me/api/portraits/lego/1.jpg",
    },
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
