const express = require("express");
const router = express.Router();
const {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
} = require("../Controllers/companiesController");

router.route("/").get(getAllCompanies).post(createCompany);

router.route("/:id").put(updateCompany).delete(deleteCompany).get(getCompany);

module.exports = router;
