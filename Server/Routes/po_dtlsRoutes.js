const express = require("express");
const router = express.Router();
const {
  getAllPurchaseOrderDetails,
  createPurchaseOrderDetails,
  updatePurchaseOrderDetails,
  deletePurchaseOrderDetails,
} = require("../Controllers/po_dtlsController");

router
  .route("/:purchase_order_id")
  .get(getAllPurchaseOrderDetails)
  .put(updatePurchaseOrderDetails)
  .delete(deletePurchaseOrderDetails)
  .post(createPurchaseOrderDetails);


module.exports = router;
