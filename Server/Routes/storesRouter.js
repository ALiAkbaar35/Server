const express = require("express");
const router = express.Router();
const {
  getAllStores,
  createStore,
  updateStore,
  deleteStore,
  getStore,
} = require("../Controllers/storeController");

router.route("/").get(getAllStores).post(createStore);

router.route("/:id").put(updateStore).delete(deleteStore).get(getStore);

module.exports = router;
