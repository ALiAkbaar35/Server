const express = require("express");
const router = express.Router();
const {
  getAllQuantities,
  createQuantity,
  updateQuantity,
  deleteQuantity,
  getQuantity,
} = require("../Controllers/quantityController");

router.route("/").get(getAllQuantities).post(createQuantity);

router
  .route("/:id")
  .put(updateQuantity)
  .delete(deleteQuantity)
  .get(getQuantity);

module.exports = router;
