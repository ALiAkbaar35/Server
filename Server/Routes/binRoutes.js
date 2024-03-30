const express = require("express");
const router = express.Router();
const {
  getAllBinItems,
  createBinItem,
  updateBinItem,
  deleteBinItem,
  getBinItem,
} = require("../Controllers/binController");

router.route("/").get(getAllBinItems).post(createBinItem);

router.route("/:id").put(updateBinItem).delete(deleteBinItem).get(getBinItem);

module.exports = router;
