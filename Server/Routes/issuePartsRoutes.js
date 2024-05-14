const express = require("express");
const router = express.Router();
const {
  getAllIssueParts,
  createIssuePart,
  updateIssuePart,
  deleteIssuePart,
  getIssuePart,
} = require("../Controllers/issuePartsController");

router.route("/").get(getAllIssueParts).post(createIssuePart);

router
  .route("/:id")
  .put(updateIssuePart)
  .delete(deleteIssuePart)
  .get(getIssuePart);

module.exports = router;
