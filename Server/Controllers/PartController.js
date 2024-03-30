const connectDb = require("../Config/connectDb");

//@desc     GET ALL PARTS
//@route    GET /api/parts
//@access   Public
const getAllParts = (req, res) => {
  connectDb.query(
    "SELECT * FROM parts ORDER BY updated_at DESC",
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

//@desc     CREATE PART
//@route    POST /api/parts
//@access   Public
const createPart = async (req, res) => {
  const {
    code,
    description,
    partcategory_id,
    purchase_price,
    user_id,
    created_at,
    updated_at,
  } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (
      !code ||
      !description ||
      !partcategory_id ||
      !purchase_price ||
      !user_id ||
      !created_at ||
      !updated_at
    ) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const sql =
      "INSERT INTO parts (code, description, partcategory_id, purchase_price, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const result = await connectDb.query(sql, [
      code,
      description,
      partcategory_id,
      purchase_price,
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

//@desc     UPDATE PART
//@route    PUT /api/parts/:id
//@access   Public
const updatePart = async (req, res) => {
  const partId = req.params.id;
  const {
    code,
    description,
    partcategory_id,
    purchase_price,
    user_id,
    created_at,
    updated_at,
  } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (
      !code ||
      !description ||
      !partcategory_id ||
      !purchase_price ||
      !user_id ||
      !created_at ||
      !updated_at
    ) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the part in the database
    const sql =
      "UPDATE parts SET code = ?, description = ?, partcategory_id = ?, purchase_price = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
    const result = await connectDb.query(sql, [
      code,
      description,
      partcategory_id,
      purchase_price,
      user_id,
      created_at,
      updated_at,
      partId,
    ]);

    if (result) {
      return res.status(201).json({ message: "success" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     DELETE PART
//@route    DELETE /api/parts/:id
//@access   Public
const deletePart = async (req, res) => {
  const partId = req.params.id;

  try {
    // Delete the part from the database
    const sql = "DELETE FROM parts WHERE id = ?";
    const result = await connectDb.query(sql, [partId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     GET PART
//@route    GET /api/parts/:id
//@access   Public
const getPart = (req, res) => {
  res.status(200).json({ message: `Get part ${req.params.id}` });
};

module.exports = {
  getAllParts,
  createPart,
  updatePart,
  deletePart,
  getPart,
};
