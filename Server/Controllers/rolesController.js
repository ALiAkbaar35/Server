const connectDb = require("../Config/connectDb");

//@desc     GET ALL ROLES
//@route    GET /api/roles
//@access   Public
const getAllRoles = (req, res) => {
  connectDb.query(
    "SELECT * FROM roles ORDER BY updated_at DESC",
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

//@desc     CREATE ROLE
//@route    POST /api/roles
//@access   Public
const createRole = async (req, res) => {
  const { description, user_id, created_at, updated_at } = req.body;

  // Check if all mandatory fields are provided
  if (!description || !user_id || !created_at || !updated_at) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  const sql =
    "INSERT INTO roles (description, user_id, created_at, updated_at) VALUES (?, ?, ?, ?)";
  await connectDb.query(
    sql,
    [description, user_id, created_at, updated_at],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(201).json({ message: "success" });
    }
  );
};

//@desc     UPDATE ROLE
//@route    PUT /api/roles/:id
//@access   Public
const updateRole = async (req, res) => {
  const roleId = req.params.id;
  const { description, user_id, created_at, updated_at } = req.body;


    // Check if all mandatory fields are provided
    if (!description || !user_id || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the role in the database
    const sql =
      "UPDATE roles SET description = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
    const result = await connectDb.query(sql, [
        description,
        user_id,
        created_at,
        updated_at,
        roleId,
    ], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(201).json({ message: "success" });
    });
};

//@desc     DELETE ROLE
//@route    DELETE /api/roles/:id
//@access   Public
const deleteRole = async (req, res) => {
  const roleId = req.params.id;

  // Delete the role from the database
  const sql = "DELETE FROM roles WHERE id = ?";
  connectDb.query(sql, [roleId], (err, result) => {
    if (err) {
      console.error("Error deleting role:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(201).json({ message: "success" });
  });
};

//@desc     GET ROLE
//@route    GET /api/roles/:id
//@access   Public
const getRole = (req, res) => {
  res.status(200).json({ message: `Get role ${req.params.id}` });
};

module.exports = {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  getRole,
};
