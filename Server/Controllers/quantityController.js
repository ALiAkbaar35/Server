const connectDb = require("../Config/connectDb");

//@desc     GET ALL Quantities
//@route    GET /api/Quantities
//@access   Public
const getAllQuantities = (req, res) => {
  connectDb.query(
    "SELECT * FROM part_qties ORDER BY updated_at DESC",
    (error, results, fields) => {
      if (error) {
        console.error("Error fetching data from the database:", error);
        return res
          .status(500)
          .json({ error: "Error fetching data from the database" });
      }
      res.status(200).json({ message: "success", data: results });
    }
  );
};

//@desc     CREATE Quantity
//@route    POST /api/Quantities
//@access   Public
const createQuantity = async (req, res) => {
  const { part_id, store_id, bin_id, qty, user_id, created_at, updated_at } =
    req.body;

  try {
    // Check if all mandatory fields are provided
    if (
      !part_id ||
      !store_id ||
      !bin_id ||
      !qty ||
      !user_id ||
      !created_at ||
      !updated_at
    ) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const sql =
      "INSERT INTO part_qties (part_id, store_id, bin_id, qty, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const result = await connectDb.query(sql, [
      part_id,
      store_id,
      bin_id,
      qty,
      user_id,
      created_at,
      updated_at,
    ]);

    if (result) {
      return res.status(201).json({ message: "success" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     UPDATE Quantity
//@route    PUT /api/Quantities/:id
//@access   Public
const updateQuantity = async (req, res) => {
  const quantityId = req.params.id;
  const { part_id, store_id, bin_id, qty, user_id, created_at, updated_at } =
    req.body;

  try {
    // Check if all mandatory fields are provided
    if (
      !part_id ||
      !store_id ||
      !bin_id ||
      !qty ||
      !user_id ||
      !created_at ||
      !updated_at
    ) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the Quantity in the database
    const sql =
      "UPDATE part_qties SET part_id = ?, store_id = ?, bin_id = ?, qty = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
    const result = await connectDb.query(sql, [
      part_id,
      store_id,
      bin_id,
      qty,
      user_id,
      created_at,
      updated_at,
      quantityId,
    ]);

    if (result) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     DELETE Quantity
//@route    DELETE /api/Quantities/:id
//@access   Public
const deleteQuantity = async (req, res) => {
  const quantityId = req.params.id;

  try {
    // Delete the Quantity from the database
    const sql = "DELETE FROM part_qties WHERE id = ?";
    const result = await connectDb.query(sql, [quantityId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     GET Quantity
//@route    GET /api/Quantities/:id
//@access   Public
const getQuantity = (req, res) => {
  res.status(200).json({ message: `Get Quantity ${req.params.id}` });
};

module.exports = {
  getAllQuantities,
  createQuantity,
  updateQuantity,
  deleteQuantity,
  getQuantity,
};
