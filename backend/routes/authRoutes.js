const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  makeAdmin,
} = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/logout", logout);
router.get("/make-admin", protect, makeAdmin);

module.exports = router;
