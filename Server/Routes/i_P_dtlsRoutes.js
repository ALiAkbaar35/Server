const express = require("express");
const router = express.Router();
const {
  getAllIssuePartsDetails,
  createIssuePartsDetail,
  updateIssuePartsDetail,
  deleteIssuePartsDetail,
} = require("../Controllers/i_p_dtlsController");

router
  .route("/:issue_part_id")
  .get(getAllIssuePartsDetails)
  .put(updateIssuePartsDetail)
  .delete(deleteIssuePartsDetail)
  .post(createIssuePartsDetail);

module.exports = router;
