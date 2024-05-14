const express = require("express");
const router = express.Router();
const {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  getRole,
} = require("../Controllers/rolesController");

router.route("/").get(getAllRoles).post(createRole);

router.route("/:id").put(updateRole).delete(deleteRole).get(getRole);

module.exports = router;
