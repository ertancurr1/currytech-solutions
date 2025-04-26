const express = require("express");
const {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(submitContact)
  .get(protect, authorize("admin"), getContacts);

router
  .route("/:id")
  .get(protect, authorize("admin"), getContact)
  .put(protect, authorize("admin"), updateContact)
  .delete(protect, authorize("admin"), deleteContact);

module.exports = router;
