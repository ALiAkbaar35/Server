const express = require("express");
const router = express.Router();
const {
  getAllpurchaseOrder,
  createpurchaseOrder,
  updatepurchaseOrder,
  deletepurchaseOrder,
  getpurchaseOrder,
} = require("../Controllers/purchaseOrdersController");

router.route("/").get(getAllpurchaseOrder).post(createpurchaseOrder);

router
  .route("/:id")
  .put(updatepurchaseOrder)
  .delete(deletepurchaseOrder)
  .get(getpurchaseOrder);

module.exports = router;
