const connectDb = require("../Config/connectDb");

//@desc     GET ALL Workshops
//@route    GET /api/Workshops
//@access   Public
const getAllWorkshops = (req, res) => {
  connectDb.query(
    "SELECT * FROM Workshops ORDER BY updated_at DESC",
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

//@desc     CREATE Workshop
//@route    POST /api/Workshops
//@access   Public
const createWorkshop = async (req, res) => {
  const {
    code,
    description,
    address,
    phone,
    email,
    user_id,
    created_at,
    updated_at,
  } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (!code || !description || !user_id || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const sql =
      "INSERT INTO Workshops (code, description, address, phone, email, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const result = await connectDb.query(sql, [
      code,
      description,
      address,
      phone,
      email,
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

//@desc     UPDATE Workshop
//@route    PUT /api/Workshops/:id
//@access   Public
const updateWorkshop = async (req, res) => {
  const WorkshopId = req.params.id;
  const {
    code,
    description,
    address,
    phone,
    email,
    user_id,
    created_at,
    updated_at,
  } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (!code || !description || !user_id || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the Workshop in the database
    const sql =
      "UPDATE Workshops SET code = ?, description = ?, address = ?, phone = ?, email = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
    const result = await connectDb.query(sql, [
      code,
      description,
      address,
      phone,
      email,
      user_id,
      created_at,
      updated_at,
      WorkshopId,
    ]);

    if (result) {
      return res.status(201).json({ message: "success" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     DELETE Workshop
//@route    DELETE /api/Workshops/:id
//@access   Public
const deleteWorkshop = async (req, res) => {
  const WorkshopId = req.params.id;

  try {
    // Delete the Workshop from the database
    const sql = "DELETE FROM Workshops WHERE id = ?";
    const result = await connectDb.query(sql, [WorkshopId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     GET Workshop
//@route    GET /api/Workshops/:id
//@access   Public
const getWorkshop = (req, res) => {
  res.status(200).json({ message: `Get Workshop ${req.params.id}` });
};

module.exports = {
  getAllWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getWorkshop,
};
