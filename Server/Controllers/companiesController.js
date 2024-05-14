const connectDb = require("../Config/connectDb");

//@desc     GET ALL BIN ITEMS
//@route    GET /api/bin-items
//@access   Public
const getAllCompanies = (req, res) => {
  connectDb.query(
    "SELECT * FROM companies ORDER BY updated_at DESC",
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
const createCompany = async (req, res) => {
  const { code, description, user_id, created_at, updated_at } = req.body;

  // Check if all mandatory fields are provided
  if (!code || !description || !user_id || !created_at || !updated_at) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  const sql =
    "INSERT INTO companies (code, description, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
  await connectDb.query(
    sql,
    [code, description, user_id, created_at, updated_at],
    (err, result) => {
      if (err) {
        return res.status(201).json({ message: "error" });
      } else {
        return res.status(201).json({ message: "success" });
      }
    }
  );
};

//@desc     UPDATE BIN ITEM
//@route    PUT /api/bin-items/:id
//@access   Public
const updateCompany = async (req, res) => {
  const binId = req.params.id;
  const { code, description, user_id, created_at, updated_at } = req.body;


    // Check if all mandatory fields are provided
    if (!code || !description || !user_id || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the bin item in the database
    const sql =
      "UPDATE companies SET code = ?, description = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
    const result = await connectDb.query(sql, [
      code,
      description,
      user_id,
      created_at,
      updated_at,
      binId,
    ],(err, result) => {
      if (err) {
        return res.status(201).json({ message: "error" });
      } 
        return res.status(201).json({ message: "success" });
      
    }
  );
 
};

//@desc     DELETE BIN ITEM
//@route    DELETE /api/bin-items/:id
//@access   Public
const deleteCompany = async (req, res) => {
  const binId = req.params.id;

  // Delete the bin item from the database
  const sql = "DELETE FROM companies WHERE id = ?";
  connectDb.query(sql, [binId], (err, result) => {
    if (err) {
      console.log("Error delete bin :", err);
      return res.status(500).json({ error: err });
    } else {
      return res.status(201).json({ message: "success" });
    }
  });
};

//@desc     GET BIN ITEM
//@route    GET /api/bin-items/:id
//@access   Public
const getCompany = (req, res) => {
  res.status(200).json({ message: `Get bin item ${req.params.id}` });
};

module.exports = {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
};
