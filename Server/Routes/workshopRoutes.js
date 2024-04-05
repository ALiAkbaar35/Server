const express = require("express");
const router = express.Router();
const {
  getAllWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getWorkshop,
} = require("../Controllers/workshopController");

router.route("/").get(getAllWorkshops).post(createWorkshop);

router
  .route("/:id")
  .put(updateWorkshop)
  .delete(deleteWorkshop)
  .get(getWorkshop);

module.exports = router;
