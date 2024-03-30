const express = require("express");
const router = express.Router();
const {
  getAllVendors,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendor,
} = require("../Controllers/vendorController");

router.route("/").get(getAllVendors).post(createVendor);

router.route("/:id").put(updateVendor).delete(deleteVendor).get(getVendor);

module.exports = router;
