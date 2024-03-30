const connectDb = require("../Config/connectDb");

//@desc     GET ALL VENDORS
//@route    GET /api/vendors
//@access   Public
const getAllVendors = (req, res) => {
  connectDb.query(
    "SELECT * FROM vendors ORDER BY updated_at DESC",
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

//@desc     CREATE VENDOR
//@route    POST /api/vendors
//@access   Public
const createVendor = async (req, res) => {
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
    if (
      !code ||
      !description ||
      !user_id ||
      !created_at ||
      !updated_at
    ) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const sql =
      "INSERT INTO vendors (code, description, address, phone, email, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
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

//@desc     UPDATE VENDOR
//@route    PUT /api/vendors/:id
//@access   Public
const updateVendor = async (req, res) => {
  const vendorId = req.params.id;
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
    if (
      !code ||
      !description ||
      !user_id ||
      !created_at ||
      !updated_at
    ) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the vendor in the database
    const sql =
      "UPDATE vendors SET code = ?, description = ?, address = ?, phone = ?, email = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
    const result = await connectDb.query(sql, [
      code,
      description,
      address,
      phone,
      email,
      user_id,
      created_at,
      updated_at,
      vendorId,
    ]);

    if (result) {
      return res.status(201).json({ message: "success" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     DELETE VENDOR
//@route    DELETE /api/vendors/:id
//@access   Public
const deleteVendor = async (req, res) => {
  const vendorId = req.params.id;

  try {
    // Delete the vendor from the database
    const sql = "DELETE FROM vendors WHERE id = ?";
    const result = await connectDb.query(sql, [vendorId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     GET VENDOR
//@route    GET /api/vendors/:id
//@access   Public
const getVendor = (req, res) => {
  res.status(200).json({ message: `Get vendor ${req.params.id}` });
};

module.exports = {
  getAllVendors,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendor,
};
