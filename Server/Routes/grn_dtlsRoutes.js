const express = require("express");
const router = express.Router();
const {
  getAllGRN_Details,
  getAllGRNDetails,
  createGRNDetails,
  updateGRNDetails,
  deleteGRNDetails,
} = require("../Controllers/grn_dtlsController");
router.route("/").get(getAllGRN_Details);
router
  .route("/:id")
  .get(getAllGRNDetails)
  .post(createGRNDetails)
  .put(updateGRNDetails)
  .delete(deleteGRNDetails);

module.exports = router;
