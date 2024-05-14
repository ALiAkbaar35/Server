const express = require("express");
const router = express.Router();
const {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
} = require("../Controllers/departmentController");

router.route("/").get(getAllDepartments).post(createDepartment);

router.route("/:id").put(updateDepartment).delete(deleteDepartment).get(getDepartment);

module.exports = router;
