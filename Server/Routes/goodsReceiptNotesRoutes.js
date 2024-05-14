const express = require("express");
const router = express.Router();
const {
  getAllgoods_receipt_notes,
  creategoods_receipt_notes,
  updategoods_receipt_notes,
  deletegoods_receipt_notes,
  getgoods_receipt_notes,
} = require("../Controllers/goodsReceiptNotesController");

router
  .route("/")
  .get(getAllgoods_receipt_notes)
  .post(creategoods_receipt_notes);

router
  .route("/:id")
  .put(updategoods_receipt_notes)
  .delete(deletegoods_receipt_notes)
  .get(getgoods_receipt_notes);

module.exports = router;
