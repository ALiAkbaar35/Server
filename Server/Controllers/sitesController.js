const connectDb = require("../Config/connectDb");

//@desc     GET ALL SITES
//@route    GET /api/sites
//@access   Public
const getAllSites = (req, res) => {
  connectDb.query(
    "SELECT * FROM sites ORDER BY updated_at DESC",
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

//@desc     CREATE SITE
//@route    POST /api/sites
//@access   Public
const createSite = async (req, res) => {
  const { code, description, user_id, created_at, updated_at } = req.body;

  // Check if all mandatory fields are provided
  if (!code || !description || !user_id || !created_at || !updated_at) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  const sql =
    "INSERT INTO sites (code, description, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
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


//@desc     UPDATE SITE
//@route    PUT /api/sites/:id
//@access   Public
const updateSite = async (req, res) => {
  const siteId = req.params.id;
  const {code, description, user_id, created_at, updated_at } = req.body;

  // Check if all mandatory fields are provided
  if (!code || !description || !user_id || !created_at || !updated_at) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  // Update the site in the database
  const sql =
    "UPDATE sites SET code = ?,  description = ?, user_id = ?, created_at = ?, updated_at = ? WHERE id = ?";
  await connectDb.query(
    sql,
    [code,description, user_id, created_at, updated_at, siteId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(201).json({ message: "success" });
    }
  );
};

//@desc     DELETE SITE
//@route    DELETE /api/sites/:id
//@access   Public
const deleteSite = async (req, res) => {
  const siteId = req.params.id;

  // Delete the site from the database
  const sql = "DELETE FROM sites WHERE id = ?";
  connectDb.query(sql, [siteId], (err, result) => {
    if (err) {
      console.error("Error deleting site:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(201).json({ message: "success" });
  });
};

//@desc     GET SITE
//@route    GET /api/sites/:id
//@access   Public
const getSite = (req, res) => {
  res.status(200).json({ message: `Get site ${req.params.id}` });
};

module.exports = {
  getAllSites,
  createSite,
  updateSite,
  deleteSite,
  getSite,
};
