const connectDb = require("../Config/connectDb");

//@desc     GET ALL Store
//@route    GET /api/Store
//@access   Public
const getAllStores = (req, res) => {
  connectDb.query(
    "SELECT * FROM stores ORDER BY updated_at DESC",
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

//@desc     CREATE CATEGORY
//@route    POST /api/Store
//@access   Public
const createStore = async (req, res) => {
  const { code, description, user_id, created_at, updated_at } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (!code || !description || !user_id || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const sql =
      "INSERT INTO stores (code, description, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
    const result = await connectDb.query(sql, [
      code,
      description,
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

//@desc     UPDATE CATEGORY
//@route    PUT /api/Store/:id
//@access   Public
const updateStore = async (req, res) => {
  const storeId = req.params.id;
  const { code, description, user_id, created_at, updated_at } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (!code || !description || !user_id || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the Store in the database
    const sql =
      "UPDATE stores SET code = ?, description = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
    const result = await connectDb.query(sql, [
      code,
      description,
      user_id,
      created_at,
      updated_at,
      storeId,
    ]);

    if (result) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     DELETE CATEGORY
//@route    DELETE /api/Store/:id
//@access   Public
const deleteStore = async (req, res) => {
  const storeId = req.params.id;

  try {
    // Delete the Store from the database
    const sql = "DELETE FROM stores WHERE id = ?";
    const result = await connectDb.query(sql, [storeId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     GET CATEGORY
//@route    GET /api/Store/:id
//@access   Public
const getStore = (req, res) => {
  res.status(200).json({ message: `Get Store ${req.params.id}` });
};

module.exports = {
  getAllStores,
  createStore,
  updateStore,
  deleteStore,
  getStore,
};
