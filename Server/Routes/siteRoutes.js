const express = require("express");
const router = express.Router();
const {
  getAllSites,
  createSite,
  updateSite,
  deleteSite,
  getSite,
} = require("../Controllers/sitesController");

router.route("/").get(getAllSites).post(createSite);

router.route("/:id").put(updateSite).delete(deleteSite).get(getSite);

module.exports = router;
