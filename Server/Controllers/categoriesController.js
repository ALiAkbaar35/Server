const connectDb = require("../Config/connectDb");

//@desc     GET ALL CATEGORIES
//@route    GET /api/categories
//@access   Public
const getAllCategories = (req, res) => {
  connectDb.query(
    "SELECT * FROM part_categories ORDER BY updated_at DESC",
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
//@route    POST /api/categories
//@access   Public
const createCategory = async (req, res) => {
  const { code, description, user_id, created_at, updated_at } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (!code || !description || !user_id || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const sql =
      "INSERT INTO part_categories (code, description, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
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
//@route    PUT /api/categories/:id
//@access   Public
const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { code, description, user_id, created_at, updated_at } = req.body;

  try {
    // Check if all mandatory fields are provided
    if (!code || !description || !user_id || !created_at || !updated_at) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Update the category in the database
    const sql =
      "UPDATE part_categories SET code = ?, description = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
    const result = await connectDb.query(sql, [
      code,
      description,
      user_id,
      created_at,
      updated_at,
      categoryId,
    ]);

    if (result) {
      return res.status(201).json({ message: "success" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     DELETE CATEGORY
//@route    DELETE /api/categories/:id
//@access   Public
const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Delete the category from the database
    const sql = "DELETE FROM part_categories WHERE id = ?";
    const result = await connectDb.query(sql, [categoryId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc     GET CATEGORY
//@route    GET /api/categories/:id
//@access   Public
const getCategory = (req, res) => {
  res.status(200).json({ message: `Get category ${req.params.id}` });
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
