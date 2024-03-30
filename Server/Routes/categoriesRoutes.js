const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../Controllers/categoriesController");

router.route("/").get(getAllCategories).post(createCategory);

router
  .route("/:id")
  .put(updateCategory)
  .delete(deleteCategory)
  .get(getCategory);

module.exports = router;
