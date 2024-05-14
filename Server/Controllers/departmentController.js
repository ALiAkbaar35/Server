const connectDb = require("../Config/connectDb");

//@desc     GET ALL DEPARTMENTS
//@route    GET /api/departments
//@access   Public
const getAllDepartments = (req, res) => {
  connectDb.query(
    "SELECT * FROM departments ORDER BY updated_at DESC",
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

//@desc     CREATE DEPARTMENT
//@route    POST /api/departments
//@access   Public
const createDepartment = async (req, res) => {
  const { code, description, user_id, created_at, updated_at } = req.body;

  // Check if all mandatory fields are provided
  if (!code || !description || !user_id || !created_at || !updated_at) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  const sql =
    "INSERT INTO departments (code, description, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
  await connectDb.query(
    sql,
    [code, description, user_id, created_at, updated_at],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(201).json({ message: "success" });
    }
  );
};

//@desc     UPDATE DEPARTMENT
//@route    PUT /api/departments/:id
//@access   Public
const updateDepartment = async (req, res) => {
  const departmentId = req.params.id;
  const { code, description, user_id, created_at, updated_at } = req.body;

  // Check if all mandatory fields are provided
  if (!code || !description || !user_id || !created_at || !updated_at) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  // Update the department in the database
  const sql =
    "UPDATE departments SET code = ?, description = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
  await connectDb.query(
    sql,
    [code, description, user_id, created_at, updated_at, departmentId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(201).json({ message: "success" });
    }
  );
};

//@desc     DELETE DEPARTMENT
//@route    DELETE /api/departments/:id
//@access   Public
const deleteDepartment = async (req, res) => {
  const departmentId = req.params.id;

  // Delete the department from the database
  const sql = "DELETE FROM departments WHERE id = ?";
  connectDb.query(sql, [departmentId], (err, result) => {
    if (err) {
      console.error("Error deleting department:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(201).json({ message: "success" });
  });
};

//@desc     GET DEPARTMENT
//@route    GET /api/departments/:id
//@access   Public
const getDepartment = (req, res) => {
  res.status(200).json({ message: `Get department ${req.params.id}` });
};

module.exports = {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
};
