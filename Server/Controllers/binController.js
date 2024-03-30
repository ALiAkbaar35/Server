const connectDb = require("../Config/connectDb");

//@desc     GET ALL BIN ITEMS
//@route    GET /api/bin-items
//@access   Public
const getAllBinItems = (req, res) => {
  connectDb.query(
    "SELECT * FROM bins ORDER BY updated_at DESC",
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

//@desc     CREATE BIN ITEM
//@route    POST /api/bin-items
//@access   Public
const createBinItem = async (req, res) => {
  const { code, description, user_id, created_at, updated_at } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (!code || !description || !user_id || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const sql =
      "INSERT INTO bins (code, description, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
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

//@desc     UPDATE BIN ITEM
//@route    PUT /api/bin-items/:id
//@access   Public
const updateBinItem = async (req, res) => {
  const binId = req.params.id;
  const { code, description, user_id, created_at, updated_at } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (!code || !description || !user_id || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the bin item in the database
    const sql =
      "UPDATE bins SET code = ?, description = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
    const result = await connectDb.query(sql, [
      code,
      description,
      user_id,
      created_at,
      updated_at,
      binId,
    ]);

    if (result) {
      return res.status(201).json({ message: "success" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     DELETE BIN ITEM
//@route    DELETE /api/bin-items/:id
//@access   Public
const deleteBinItem = async (req, res) => {
  const binId = req.params.id;
  
  try {
    // Delete the bin item from the database
    const sql = "DELETE FROM bins WHERE id = ?";
    const result = await connectDb.query(sql, [binId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "success" });
    } 
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


//@desc     GET BIN ITEM
//@route    GET /api/bin-items/:id
//@access   Public
const getBinItem = (req, res) => {
  res.status(200).json({ message: `Get bin item ${req.params.id}` });
};

module.exports = {
  getAllBinItems,
  createBinItem,
  updateBinItem,
  deleteBinItem,
  getBinItem,
};
