const express = require("express");
const router = express.Router();
const {
  getAllParts,
  createPart,
  updatePart,
  deletePart,
  getPart,
} = require("../Controllers/partController");

router.route("/").get(getAllParts).post(createPart);

router.route("/:id").put(updatePart).delete(deletePart).get(getPart);


module.exports = router;
